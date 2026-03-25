import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();

    if (process.env.NODE_ENV === 'production') {
      console.log('[Web Vitals]', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        url: request.headers.get('referer') || 'unknown',
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[Analytics Error]', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export const runtime = 'edge';
