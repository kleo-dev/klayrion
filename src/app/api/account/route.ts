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

    await database.users.insertOne({ email, password, name });

    const sessionId = (await database.sessions.insertOne({ email })).insertedId;

    return NextResponse.json(
        {
            message: 'ok',
            sessionId,
        },
        { status: 200 }
    );
}

// Account login
// Email exists
// Password is valid
export async function GET(req: NextRequest) {
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
            { status: 400 }
        );

    if (user.password !== password)
        return NextResponse.json(
            {
                message: 'Invalid password',
            },
            { status: 400 }
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
