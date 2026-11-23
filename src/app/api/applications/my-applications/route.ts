import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'LABOURER' || !user.labourerProfile) {
      return NextResponse.json({ error: 'Unauthorized: Labourers only' }, { status: 403 });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { labourerId: user.labourerProfile.id },
      orderBy: { createdAt: 'desc' },
      include: {
        jobPost: {
          include: {
            farmer: {
              include: {
                user: {
                  select: { phone: true },
                },
              },
            },
          },
        },
      },
    });

    // Format output: reveal farmer's phone ONLY when application is ACCEPTED
    const formatted = applications.map((app) => {
      const farmer = app.jobPost.farmer;
      const isAccepted = app.status === 'ACCEPTED';

      return {
        id: app.id,
        jobId: app.jobPostId,
        jobTitle: app.jobPost.title,
        cropType: app.jobPost.cropType,
        activity: app.jobPost.activity,
        dailyWage: app.jobPost.dailyWage,
        wageType: app.jobPost.wageType,
        startDate: app.jobPost.startDate,
        endDate: app.jobPost.endDate,
        district: app.jobPost.district,
        village: app.jobPost.village,
        status: app.status,
        workersOffered: app.workersOffered,
        createdAt: app.createdAt,
        farmer: {
          name: farmer.fullName,
          farmName: farmer.farmName,
          phone: isAccepted ? farmer.user.phone : null,
          canCall: isAccepted,
        },
      };
    });

    return NextResponse.json({ applications: formatted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
