import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'FARMER' || !user.farmerProfile) {
      return NextResponse.json({ error: 'Unauthorized: Farmers only' }, { status: 403 });
    }

    const body = await req.json();
    const { decision } = body; // 'ACCEPT' | 'REJECT'

    if (!['ACCEPT', 'REJECT'].includes(decision)) {
      return NextResponse.json(
        { error: "Decision must be 'ACCEPT' or 'REJECT'" },
        { status: 400 }
      );
    }

    const targetStatus = decision === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED';

    const application = await prisma.jobApplication.findUnique({
      where: { id: params.id },
      include: {
        jobPost: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.jobPost.farmerId !== user.farmerProfile.id) {
      return NextResponse.json({ error: 'Forbidden: not your job posting' }, { status: 403 });
    }

    // Atomic transaction: update application status, recalculate total accepted workers, and auto-close if full
    const result = await prisma.$transaction(async (tx) => {
      const updatedApp = await tx.jobApplication.update({
        where: { id: params.id },
        data: { status: targetStatus },
        include: {
          labourer: {
            include: {
              user: {
                select: { phone: true },
              },
            },
          },
        },
      });

      // Sum all accepted workers for this post
      const acceptedApps = await tx.jobApplication.findMany({
        where: {
          jobPostId: application.jobPostId,
          status: 'ACCEPTED',
        },
      });

      const totalHired = acceptedApps.reduce((sum, a) => sum + (a.workersOffered || 1), 0);
      let jobStatus = application.jobPost.status;

      // Auto-close if hired count meets or exceeds workers needed
      if (totalHired >= application.jobPost.workersNeeded && jobStatus === 'OPEN') {
        jobStatus = 'FILLED';
        await tx.jobPost.update({
          where: { id: application.jobPostId },
          data: { status: 'FILLED' },
        });
      }

      return { updatedApp, totalHired, jobStatus };
    });

    return NextResponse.json({
      message: `Applicant successfully ${targetStatus.toLowerCase()}`,
      application: result.updatedApp,
      totalHired: result.totalHired,
      jobStatus: result.jobStatus,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
