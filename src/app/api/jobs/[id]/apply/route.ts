import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'LABOURER' || !user.labourerProfile) {
      return NextResponse.json(
        { error: 'Only agricultural labourers can apply for jobs' },
        { status: 403 }
      );
    }

    const job = await prisma.jobPost.findUnique({
      where: { id: params.id },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job post not found' }, { status: 404 });
    }

    if (job.status !== 'OPEN') {
      return NextResponse.json(
        { error: `This job is ${job.status.toLowerCase()} and no longer accepting applications` },
        { status: 400 }
      );
    }

    // Duplicate prevention
    const existing = await prisma.jobApplication.findUnique({
      where: {
        jobPostId_labourerId: {
          jobPostId: params.id,
          labourerId: user.labourerProfile.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You have already submitted an application for this job post' },
        { status: 409 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const workersOffered = user.labourerProfile.isCrewLeader
      ? Number(body.workersOffered || user.labourerProfile.crewSize || 1)
      : 1;

    const application = await prisma.jobApplication.create({
      data: {
        jobPostId: params.id,
        labourerId: user.labourerProfile.id,
        workersOffered,
        applicantNote: body.applicantNote || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Application failed' }, { status: 500 });
  }
}
