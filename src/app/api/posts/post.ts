import { TwitterApi } from 'twitter-api-v2';
import config from '@/app/api/env';
import { inspect } from 'util';
import { PostRequest } from '@/utils';
import database from '../database';
import { format } from 'date-fns';
import cron from 'node-cron';

export default async function post({ platforms, content }: PostRequest) {
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
}

export async function processTasks() {
    try {
        const scheduled = format(new Date(), 'y-MM-d-hh:mm');

        const tasks = await database.schedules
            .find({
                scheduled,
            })
            .toArray();

        for (const task of tasks) {
            post(task);
        }

        database.schedules.deleteMany({
            scheduled,
        });
    } catch (error) {
        console.error('Error processing tasks:', error);
    }
}

cron.schedule('*/1 * * * *', processTasks);
