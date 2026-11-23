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

    const user = await prisma.user.findUnique({
      where: { phone: String(phone) },
      include: {
        farmerProfile: true,
        labourerProfile: true,
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

    const profile = user.farmerProfile || user.labourerProfile;
    const token = createToken({
      userId: user.id,
      role: user.role as any,
      phone: user.phone,
      profileId: profile?.id,
    });

    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        profile,
      },
    });

    // Also set HTTP cookie for browser navigation
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
