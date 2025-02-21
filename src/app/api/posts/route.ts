import { NextResponse, NextRequest } from 'next/server';
import database from '../database';
import { PostRequest, ScheduleRequest } from '@/utils';
import post from './post';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    const { sessionId, content, platforms }: PostRequest = await req.json();

    console.log(sessionId);

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

    post({
        account: session.user,
        content,
        platforms,
    });

    return NextResponse.json(
        {
            message: 'ok',
        },
        { status: 200 }
    );
}

export async function PUT(req: NextRequest) {
    const { sessionId, scheduled, content, platforms }: ScheduleRequest =
        await req.json();

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

    database.schedules.insertOne({
        account: session.user,
        scheduled,
        content,
        platforms,
    });

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
