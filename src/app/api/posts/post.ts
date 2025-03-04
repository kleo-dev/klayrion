import { TwitterApi } from 'twitter-api-v2';
import config from '@/lib/config';
import { inspect } from 'util';
import { Post } from '@/lib/types';
import database from '../../../lib/database';
import { format } from 'date-fns';
import cron from 'node-cron';
import { ObjectId } from 'mongodb';

export default async function post({ platforms, content, account }: Post) {
    try {
        const user = await database.users.findOne({
            _id: new ObjectId(account),
        });

        if (!user) return;
        for (const platformKey of platforms) {
            const platform = user.platforms[platformKey];
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
