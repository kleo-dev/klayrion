import { NextResponse, NextRequest } from 'next/server';
import database from '../database';
import { PostRequest, Schedule } from '@/utils';
import post from './post';
import { ObjectId } from 'mongodb';
import { use } from 'react';

export async function POST(req: NextRequest) {
    const request: PostRequest = await req.json();

    post(request);

    return NextResponse.json(
        {
            message: 'ok',
        },
        { status: 200 }
    );
}

export async function PUT(req: NextRequest) {
    const request: Schedule = await req.json();

    database.schedules.insertOne(request);

    return NextResponse.json(
        {
            message: 'ok',
        },
        { status: 200 }
    );
}

export async function GET(req: NextRequest) {
    const sessionId = new URL(req.url).searchParams.get('id');

    if (typeof sessionId !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure, required param `id=`',
            },
            { status: 400 }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId),
    });

    if (!session)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: 404 }
        );

    const schedules = await database.schedules
        .find({
            account: session.user,
        })
        .toArray();

    return NextResponse.json(
        {
            message: 'ok',
            schedules,
        },
        { status: 200 }
    );
}
