import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.jobPost.findUnique({
      where: { id: params.id },
      include: {
        farmer: {
          select: {
            fullName: true,
            farmName: true,
            district: true,
            taluka: true,
            village: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job post not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'FARMER' || !user.farmerProfile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const job = await prisma.jobPost.findUnique({
      where: { id: params.id },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job post not found' }, { status: 404 });
    }

    if (job.farmerId !== user.farmerProfile.id) {
      return NextResponse.json({ error: 'You do not own this job post' }, { status: 403 });
    }

    const body = await req.json();
    const { status, dailyWage, workersNeeded, additionalPerks } = body;

    const updated = await prisma.jobPost.update({
      where: { id: params.id },
      data: {
        status: status ? status.toUpperCase() : undefined,
        dailyWage: dailyWage ? Number(dailyWage) : undefined,
        workersNeeded: workersNeeded ? Number(workersNeeded) : undefined,
        additionalPerks: additionalPerks !== undefined ? additionalPerks : undefined,
      },
    });

    return NextResponse.json({ message: 'Job updated successfully', job: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'FARMER' || !user.farmerProfile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const job = await prisma.jobPost.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.farmerId !== user.farmerProfile.id) {
      return NextResponse.json({ error: 'Forbidden: not your job post' }, { status: 403 });
    }

    // Only allow deletion if no applications exist yet
    if (job._count.applications > 0) {
      return NextResponse.json(
        { error: 'Cannot delete job with existing applications. You can close or cancel it instead.' },
        { status: 400 }
      );
    }

    await prisma.jobPost.delete({ where: { id: params.id } });

    return NextResponse.json({ message: 'Job post successfully deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
