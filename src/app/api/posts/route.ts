import { NextResponse, NextRequest } from 'next/server';
import database from '../../../lib/database';
import { PostRequest, ScheduleRequest } from '@/lib/types';
import post from './post';
import { ObjectId } from 'mongodb';
import { HttpStatusCode } from 'axios';

export async function POST(req: NextRequest) {
    const sessionId = req.cookies.get('session_id');

    if (!sessionId)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: 404 }
        );

    const { content, platforms }: PostRequest = await req.json();

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId.value),
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
    const sessionId = req.cookies.get('session_id');

    if (!sessionId)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: HttpStatusCode.NotFound }
        );

    const { scheduled, content, platforms }: ScheduleRequest = await req.json();

    if (typeof scheduled !== 'string' || typeof content !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure',
            },
            { status: HttpStatusCode.BadRequest }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId.value),
    });

    if (!session)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: HttpStatusCode.NotFound }
        );

    return NextResponse.json(
        {
            message: 'ok',
            id: (
                await database.schedules.insertOne({
                    account: session.user,
                    scheduled,
                    content,
                    platforms,
                })
            ).insertedId,
        },
        { status: HttpStatusCode.Ok }
    );
}

export async function GET(req: NextRequest) {
    const sessionId = req.cookies.get('session_id');

    if (!sessionId)
        return NextResponse.json(
            {
                message: 'No session',
            },
            { status: HttpStatusCode.Unauthorized }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId.value),
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
    const sessionId = req.cookies.get('session_id');
    if (!sessionId)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: 404 }
        );

    const schedule = new URL(req.url).searchParams.get('schedule');

    if (typeof schedule !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure',
            },
            { status: HttpStatusCode.BadRequest }
        );

    const session = await database.sessions.findOne({
        _id: new ObjectId(sessionId.value),
    });

    if (!session)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: HttpStatusCode.NotFound }
        );

    const result = await database.schedules.deleteMany({
        _id: new ObjectId(schedule),
        account: session.user,
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
