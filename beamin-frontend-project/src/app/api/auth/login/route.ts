import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import authAction from '@/actions/auth.action';
import type { LoginBodyType } from '@/schemas/auth.schema';
import { HttpError } from '@/libs/http';

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();

  try {
    const { payload } = await authAction.sLogin(body);
    const { access_token, refresh_token } = payload.data;
    const decodedAccessToken = jwt.decode(access_token) as { exp: number };
    const decodedRefreshToken = jwt.decode(refresh_token) as { exp: number };

    cookieStore.set('access_token', access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });

    cookieStore.set('refresh_token', refresh_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json({ message: 'Error' }, { status: 500 });
    }
  }
}
