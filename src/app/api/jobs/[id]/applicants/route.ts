import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { serializeApplicant } from '@/lib/serializers';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'FARMER' || !user.farmerProfile) {
      return NextResponse.json({ error: 'Unauthorized: Farmers only' }, { status: 403 });
    }

    const job = await prisma.jobPost.findUnique({
      where: { id: params.id },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.farmerId !== user.farmerProfile.id) {
      return NextResponse.json({ error: 'Forbidden: not your job post' }, { status: 403 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobPostId: params.id },
      orderBy: { createdAt: 'desc' },
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

    // Privacy-preserving masking: reveal phone numbers ONLY for ACCEPTED applicants
    const sanitized = applications.map((app) =>
      serializeApplicant(app, app.status === 'ACCEPTED')
    );

    return NextResponse.json({
      jobTitle: job.title,
      workersNeeded: job.workersNeeded,
      status: job.status,
      applicants: sanitized,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
