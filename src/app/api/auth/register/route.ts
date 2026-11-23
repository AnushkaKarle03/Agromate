import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, password, role, fullName, district, taluka, village, farmName, primaryCrops, skills, experienceYears, isCrewLeader, crewSize } = body;

    if (!phone || !password || !role || !fullName || !district) {
      return NextResponse.json(
        { error: 'Missing required fields: phone, password, role, fullName, district' },
        { status: 400 }
      );
    }

    if (!['FARMER', 'LABOURER', 'ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    // Check if phone already registered
    const existing = await prisma.user.findUnique({
      where: { phone: String(phone) },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this phone number already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        phone: String(phone),
        passwordHash,
        role,
        farmerProfile:
          role === 'FARMER'
            ? {
                create: {
                  fullName,
                  farmName: farmName || null,
                  district,
                  taluka: taluka || null,
                  village: village || null,
                  primaryCrops: primaryCrops || null,
                },
              }
            : undefined,
        labourerProfile:
          role === 'LABOURER'
            ? {
                create: {
                  fullName,
                  skills: skills || 'General Farm Labour',
                  experienceYears: Number(experienceYears) || 0,
                  isCrewLeader: Boolean(isCrewLeader),
                  crewSize: Number(crewSize) || 1,
                  district,
                  taluka: taluka || null,
                  village: village || null,
                },
              }
            : undefined,
      },
      include: {
        farmerProfile: true,
        labourerProfile: true,
      },
    });

    const profileId = user.farmerProfile?.id || user.labourerProfile?.id;
    const token = createToken({
      userId: user.id,
      role: user.role as any,
      phone: user.phone,
      profileId,
    });

    return NextResponse.json(
      {
        message: 'Account successfully registered',
        user: {
          id: user.id,
          phone: user.phone,
          role: user.role,
          profile: user.farmerProfile || user.labourerProfile,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
