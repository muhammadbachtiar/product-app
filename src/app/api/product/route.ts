import { NextResponse } from 'next/server';
import { axiosExternal } from '@/configs/axios';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');

    if (!product_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const response = await axiosExternal.get('/product', {
      params: { product_id },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch product', details: error.message },
      { status: error.status }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await axiosExternal.post('/product', body);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: error.status }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.product_id) {
      return NextResponse.json(
        { error: 'Product ID is required for update' },
        { status: 400 }
      );
    }

    const response = await axiosExternal.put(`/product`, body);

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update product', details: error },
      { status: error.status }
    );
  }
}

export async function DELETE(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');

    if (!product_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const response = await axiosExternal.delete('/product', {
      params: { product_id },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete product', details: error.message },
      { status: error.status }
    );
  }
}