import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { error: 'Phone number and password are required' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, '');

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: cleanPhone },
          { phone: String(phone) },
        ],
      },
      include: {
        farmerProfile: true,
        labourerProfile: true,
        machineProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    const activeRole = user.activeRole || 'FARMER';
    const profile =
      activeRole === 'FARMER'
        ? user.farmerProfile
        : activeRole === 'LABOURER'
          ? user.labourerProfile
          : user.machineProfile || user.farmerProfile || user.labourerProfile;

    const token = createToken({
      userId: user.id,
      role: user.role,
      activeRole,
      roles: (user.roles || 'FARMER,LABOURER,MACHINE_OWNER').split(','),
      phone: user.phone,
      profileId: profile?.id,
    });

    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        role: user.role,
        activeRole,
        roles: (user.roles || 'FARMER,LABOURER,MACHINE_OWNER').split(','),
        farmerProfile: user.farmerProfile,
        labourerProfile: user.labourerProfile,
        machineProfile: user.machineProfile,
        currentProfile: profile,
      },
    });

    response.cookies.set('agromate_token', token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
