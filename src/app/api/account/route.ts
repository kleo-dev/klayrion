import { NextResponse, NextRequest } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import config from '@/env';
import { PostRequest } from '@/platform';
import { inspect } from 'util';

export async function POST(req: NextRequest) {
    return NextResponse.json(
        {
            message: 'ok, feature not available yet',
        },
        { status: 200 }
    );
}
