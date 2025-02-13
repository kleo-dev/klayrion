function error(name: string): string {
    throw `'${name}' not found in '.env'`;
}

const config = {
    twitter: {
        key: process.env.TWITTER_KEY || error('TWITTER_KEY'),
        secret: process.env.TWITTER_SECRET || error('TWITTER_SECRET'),
    },
};

export default config;
