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
