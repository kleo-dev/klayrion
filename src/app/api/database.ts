import { MongoClient } from 'mongodb';
import config from './env';
import { generateUrlSafeString, Session, User } from '@/utils';

const client = new MongoClient(config.mongoUrl);

const db = client.db('klayrion');

export default {
    users: db.collection<User>('users'),
    sessions: db.collection<Session>('sessions'),
};
