import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET: Public & Labourer Discovery feed with filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const district = searchParams.get('district');
    const activity = searchParams.get('activity');
    const cropType = searchParams.get('cropType');
    const minWage = searchParams.get('minWage');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'OPEN',
    };

    if (district) where.district = { contains: district };
    if (activity) where.activity = activity.toUpperCase();
    if (cropType) where.cropType = { contains: cropType };
    if (minWage) where.dailyWage = { gte: parseInt(minWage) };

    const [total, jobs] = await Promise.all([
      prisma.jobPost.count({ where }),
      prisma.jobPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          farmer: {
            select: {
              fullName: true,
              farmName: true,
              district: true,
              village: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST: Create new job post (Farmers only)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'FARMER' || !user.farmerProfile) {
      return NextResponse.json(
        { error: 'Only registered farmers can post labour requirements' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, cropType, activity, workersNeeded, dailyWage, wageType, startDate, endDate, district, taluka, village, additionalPerks } = body;

    if (!title || !cropType || !activity || !workersNeeded || !dailyWage || !startDate || !endDate || !district) {
      return NextResponse.json(
        { error: 'Missing mandatory fields for job posting' },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return NextResponse.json(
        { error: 'Invalid dates: End date must be on or after start date' },
        { status: 400 }
      );
    }

    if (Number(workersNeeded) <= 0 || Number(dailyWage) <= 0) {
      return NextResponse.json(
        { error: 'Worker count and daily wage must be greater than zero' },
        { status: 400 }
      );
    }

    const job = await prisma.jobPost.create({
      data: {
        farmerId: user.farmerProfile.id,
        title,
        cropType,
        activity: activity.toUpperCase(),
        workersNeeded: Number(workersNeeded),
        dailyWage: Number(dailyWage),
        wageType: wageType || 'PER_DAY',
        startDate: start,
        endDate: end,
        district,
        taluka: taluka || user.farmerProfile.taluka || null,
        village: village || user.farmerProfile.village || null,
        additionalPerks: additionalPerks || null,
        status: 'OPEN',
      },
    });

    return NextResponse.json({ message: 'Job post created successfully', job }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create job' }, { status: 500 });
  }
}
