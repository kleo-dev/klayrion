import { NextResponse, NextRequest } from 'next/server';
import database from '../database';

// Account creation
// Email doesn't exist
// Password is between 6-20 characters
export async function POST(req: NextRequest) {
    const { email, password, name } = await req.json();

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof name !== 'string'
    )
        return NextResponse.json(
            {
                message:
                    "Invalid structure, body requires 'email: string' and 'password: string'",
            },
            { status: 400 }
        );

    if (await database.users.countDocuments({ email }))
        return NextResponse.json(
            {
                message: 'Email already registered',
            },
            { status: 409 }
        );

    await database.users.insertOne({ email, password, name, platforms: [] });

    const sessionId = (await database.sessions.insertOne({ user: email }))
        .insertedId;

    return NextResponse.json(
        {
            message: 'ok',
            sessionId,
        },
        { status: 200 }
    );
}
