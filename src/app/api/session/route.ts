import { NextResponse, NextRequest } from 'next/server';
import database from '../database';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
    const sessionId = req.cookies.get('session_id');

    console.log(sessionId);

    if (!sessionId)
        return NextResponse.json(
            {
                message: 'Session not found',
            },
            { status: 401 }
        );

    const user = await database.sessions.findOne({
        _id: new ObjectId(sessionId.value),
    });

    if (!user)
        return NextResponse.json(
            {
                message: 'Invalid session',
            },
            { status: 401 }
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

    if (typeof email !== 'string' || typeof password !== 'string') {
        return NextResponse.json(
            {
                message:
                    "Invalid structure, body requires 'email: string' and 'password: string'",
            },
            { status: 400 }
        );
    }

    const user = await database.users.findOne({ email });

    if (!user || user.password !== password) {
        return NextResponse.json(
            {
                message: 'Invalid email or password',
            },
            { status: 401 }
        );
    }

    const sessionId = new ObjectId();
    await database.sessions.insertOne({
        _id: sessionId,
        user: user._id.toString(),
    });

    const response = NextResponse.json(
        {
            message: 'ok',
        },
        { status: 200 }
    );

    response.cookies.set('session_id', sessionId.toString(), {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/api',
        maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
}
