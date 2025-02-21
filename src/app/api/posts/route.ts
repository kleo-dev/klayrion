import { NextResponse, NextRequest } from 'next/server';
import database from '../database';
import { PostRequest, ScheduleRequest } from '@/utils';
import post from './post';
import { ObjectId } from 'mongodb';
import { HttpStatusCode } from 'axios';

export async function POST(req: NextRequest) {
    const { sessionId, content, platforms }: PostRequest = await req.json();

    console.log(sessionId);

    if (typeof sessionId !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure',
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

    if (
        typeof sessionId !== 'string' ||
        typeof scheduled !== 'string' ||
        typeof content !== 'string'
    )
        return NextResponse.json(
            {
                message: 'Invalid structure',
            },
            { status: HttpStatusCode.BadRequest }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId),
    });

    if (!session)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: HttpStatusCode.NotFound }
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
        { status: HttpStatusCode.Ok }
    );
}

export async function GET(req: NextRequest) {
    const sessionId = new URL(req.url).searchParams.get('id');

    if (typeof sessionId !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure, required param `id=`',
            },
            { status: HttpStatusCode.BadRequest }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId),
    });

    if (!session)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: HttpStatusCode.NotFound }
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
        { status: HttpStatusCode.Ok }
    );
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('id');
    const date = url.searchParams.get('date');

    if (typeof sessionId !== 'string' || typeof date !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure, required param `id=` and `date=`',
            },
            { status: HttpStatusCode.BadRequest }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId),
    });

    if (!session)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: HttpStatusCode.NotFound }
        );

    const result = await database.schedules.deleteMany({
        account: session.user,
        scheduled: date,
    });

    if (result.deletedCount === 0)
        return NextResponse.json(
            {
                message: 'Schedule not found',
            },
            { status: HttpStatusCode.NotFound }
        );

    return NextResponse.json(
        {
            message: 'ok',
        },
        { status: 200 }
    );
}
