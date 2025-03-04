import { NextResponse, NextRequest } from 'next/server';
import database from '../../../lib/database';
import {
    PlatformKind,
    Platforms,
    PostRequest,
    ScheduleRequest,
    UserPlatforms,
} from '@/lib/types';
import { ObjectId } from 'mongodb';
import { HttpStatusCode } from 'axios';
import getPlatformIcon from './getPlatformIcon';

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

    const user = await database.users.findOne({
        _id: new ObjectId(session.user),
    });

    if (!user)
        return NextResponse.json(
            {
                message: 'User not found',
            },
            { status: HttpStatusCode.NotFound }
        );

    const platforms: UserPlatforms = {};

    for (const [name, platform] of Object.entries(user.platforms)) {
        const icon = await getPlatformIcon(platform);
        if (!icon) continue;
        platforms[name] = {
            ...platform,
            icon,
        };
    }

    return NextResponse.json(
        {
            message: 'ok',
            platforms,
        },
        { status: HttpStatusCode.Ok }
    );
}
