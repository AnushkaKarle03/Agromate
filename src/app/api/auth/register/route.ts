import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      phone,
      password,
      fullName,
      district,
      taluka,
      village,
      primaryRole = 'FARMER',
      farmName,
      primaryCrops,
      skills = 'Harvesting, Weeding',
      experienceYears = 2,
      isCrewLeader = false,
      crewSize = 1,
      machineTypes = 'Tractor, Rotavator',
    } = body;

    if (!phone || !password || !fullName || !district) {
      return NextResponse.json(
        { error: 'Missing required fields: phone, password, fullName, district' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, '');

    // Check if phone already registered
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ phone: cleanPhone }, { phone: String(phone) }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this phone number already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const activeRole = ['FARMER', 'LABOURER', 'MACHINE_OWNER'].includes(primaryRole)
      ? primaryRole
      : 'FARMER';

    // Create user with all 3 role capabilities enabled!
    const user = await prisma.user.create({
      data: {
        phone: cleanPhone,
        passwordHash,
        role: activeRole,
        roles: 'FARMER,LABOURER,MACHINE_OWNER',
        activeRole,
        farmerProfile: {
          create: {
            fullName,
            farmName: farmName || `${fullName}'s Farm`,
            district,
            taluka: taluka || null,
            village: village || null,
            primaryCrops: primaryCrops || 'Sugarcane, Wheat, Vegetables',
          },
        },
        labourerProfile: {
          create: {
            fullName,
            skills,
            experienceYears: Number(experienceYears) || 0,
            isCrewLeader: Boolean(isCrewLeader),
            crewSize: Number(crewSize) || 1,
            district,
            taluka: taluka || null,
            village: village || null,
          },
        },
        machineProfile: {
          create: {
            fullName,
            machineTypes,
            district,
            taluka: taluka || null,
            village: village || null,
          },
        },
      },
      include: {
        farmerProfile: true,
        labourerProfile: true,
        machineProfile: true,
      },
    });

    const token = createToken({
      userId: user.id,
      role: user.role,
      activeRole,
      roles: ['FARMER', 'LABOURER', 'MACHINE_OWNER'],
      phone: user.phone,
      profileId: user.farmerProfile?.id,
    });

    const response = NextResponse.json(
      {
        message: 'Account successfully registered with multi-role access',
        user: {
          id: user.id,
          phone: user.phone,
          activeRole,
          roles: ['FARMER', 'LABOURER', 'MACHINE_OWNER'],
          farmerProfile: user.farmerProfile,
          labourerProfile: user.labourerProfile,
          machineProfile: user.machineProfile,
        },
        token,
      },
      { status: 201 }
    );

    response.cookies.set('agromate_token', token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
