import config from '@/lib/config';
import { Platform } from '@/lib/types';
import { TwitterApi } from 'twitter-api-v2';

export default async function getPlatformIcon(platform: Platform) {
    switch (platform.platform) {
        case 'x':
            const twitterClient = new TwitterApi({
                appKey: config.twitter.key,
                appSecret: config.twitter.secret,
                accessToken: platform.token,
                accessSecret: platform.secret,
            });

            const user = await twitterClient.v1.verifyCredentials();

            return user.profile_image_url_https;
        default:
            return null;
    }
}
