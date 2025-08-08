import { NextResponse } from 'next/server';
import { axiosExternal } from '@/configs/axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const offset = searchParams.get('offset') || String((Number(page) - 1) * Number(limit));
    const search = searchParams.get('search') || '';

    const response = await axiosExternal.get('/products', {
      params: {
        page,
        limit,
        offset,
        search,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}