import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            message: 'ok',
            version: '0.0.1-alpha.0',
        },
        { status: 200 }
    );
}
