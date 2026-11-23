import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'FARMER' || !user.farmerProfile) {
      return NextResponse.json({ error: 'Unauthorized: Farmers only' }, { status: 403 });
    }

    const jobs = await prisma.jobPost.findMany({
      where: { farmerId: user.farmerProfile.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ jobs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch my posts' }, { status: 500 });
  }
}
