import { NextResponse, NextRequest } from 'next/server';
import database from '../database';
import { ObjectId } from 'mongodb';

// Account login
// Email exists
// Password is valid
export async function GET(req: NextRequest) {
    const sessionId = new URL(req.url).searchParams.get('id');

    if (typeof sessionId !== 'string')
        return NextResponse.json(
            {
                message: 'Invalid structure, required param `id=`',
            },
            { status: 400 }
        );

    const user = await database.sessions.findOne({
        _id: new ObjectId(sessionId),
    });

    if (!user)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: 404 }
        );

    return NextResponse.json(
        {
            message: 'ok',
            dashboard: {
                engagement: [
                    { week: 'Mo', views: 7300 },
                    { week: 'Tuesday', views: 18000 },
                    { week: 'Wednesday', views: 12000 },
                    { week: 'Thursday', views: 12000 },
                    { week: 'Friday', views: 23000 },
                    { week: 'Saturday', views: 40000 },
                    { week: 'Sunday', views: 20000 },
                ],
            },
        },
        { status: 200 }
    );
}

// Account login
// Email exists
// Password is valid
export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    if (typeof email !== 'string' || typeof password !== 'string')
        return NextResponse.json(
            {
                message:
                    "Invalid structure, body requires 'email: string' and 'password: string'",
            },
            { status: 400 }
        );

    const user = await database.users.findOne({ email });

    if (!user)
        return NextResponse.json(
            {
                message: 'Invalid email',
            },
            { status: 401 }
        );

    if (user.password !== password)
        return NextResponse.json(
            {
                message: 'Invalid password',
            },
            { status: 401 }
        );

    const sessionId = (await database.sessions.insertOne({ email })).insertedId;

    return NextResponse.json(
        {
            message: 'ok',
            sessionId,
        },
        { status: 200 }
    );
}
