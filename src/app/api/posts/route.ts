import { NextResponse, NextRequest } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';
import config from '@/app/api/env';
import { PostRequest } from '@/utils';
import { inspect } from 'util';

export async function POST(req: NextRequest) {
    const { content, platforms }: PostRequest = await req.json();

    try {
        for (const platform of platforms) {
            switch (platform.platform) {
                // X / Twitter
                case 'x':
                    const twitterClient = new TwitterApi({
                        appKey: config.twitter.key,
                        appSecret: config.twitter.secret,
                        accessToken: platform.token,
                        accessSecret: platform.secret,
                    });

                    await twitterClient.v2.tweet(content);
            }
        }
    } catch (err) {
        console.log(inspect(err, true, null, true));
    }

    return NextResponse.json(
        {
            message: 'ok',
        },
        { status: 200 }
    );
}
