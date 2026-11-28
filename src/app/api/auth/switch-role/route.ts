import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { role } = body;

    if (!['FARMER', 'LABOURER', 'MACHINE_OWNER'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be FARMER, LABOURER, or MACHINE_OWNER' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { activeRole: role },
      include: {
        farmerProfile: true,
        labourerProfile: true,
        machineProfile: true,
      },
    });

    const activeProfile =
      role === 'FARMER'
        ? updatedUser.farmerProfile
        : role === 'LABOURER'
        ? updatedUser.labourerProfile
        : updatedUser.machineProfile;

    const token = createToken({
      userId: updatedUser.id,
      role: updatedUser.role,
      activeRole: role,
      roles: (updatedUser.roles || 'FARMER,LABOURER,MACHINE_OWNER').split(','),
      phone: updatedUser.phone,
      profileId: activeProfile?.id,
    });

    const response = NextResponse.json({
      message: `Active role switched to ${role}`,
      activeRole: role,
      user: {
        id: updatedUser.id,
        phone: updatedUser.phone,
        activeRole: role,
        roles: (updatedUser.roles || 'FARMER,LABOURER,MACHINE_OWNER').split(','),
        currentProfile: activeProfile,
      },
      token,
    });

    response.cookies.set('agromate_token', token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to switch role' },
      { status: 500 }
    );
  }
}
