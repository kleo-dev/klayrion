// import dotenv from 'dotenv';
// dotenv.config();

function error(name: string): string {
    throw `'${name}' not found in '.env'`;
}

const config = {
    twitter: {
        key: process.env.TWITTER_KEY || error('TWITTER_KEY'),
        secret: process.env.TWITTER_SECRET || error('TWITTER_SECRET'),
    },

    mongoUrl: process.env.MONGO || error('MONGO'),
};

console.log(process.env.MONGO);

export default config;
