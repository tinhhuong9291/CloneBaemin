import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { cookies } from 'next/headers';
import envConfig from '@/config/envConfig';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderData } = body;

    console.log('Request body:', body); // Log body nhận được

    const cookieStore = cookies();
    const access_token = cookieStore.get('access_token')?.value;

    if (!access_token || !orderData) {
      console.error('Missing access token or order data');
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 },
      );
    }

    const decode = jwt.decode(access_token) as jwt.JwtPayload;
    if (!decode?.id) {
      console.error('Invalid JWT token');
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const userId = decode.id;
    console.log('Decoded userId:', userId); // Log userId

    const finalOrderData = {
      ...orderData,
      userId,
    };

    console.log('Final Order Data:', finalOrderData); // Log dữ liệu gửi đi

    const response = await axios.post(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/orders`,
      finalOrderData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    console.log('Response from external API:', response.data); // Log phản hồi từ API

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error processing the request:', error); // Log lỗi
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
