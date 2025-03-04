import { MongoClient } from 'mongodb';
import config from './config';
import { Schedule, Session, User } from '@/lib/types';

const client = new MongoClient(config.mongoUrl);

await client.connect();

const db = client.db('klayrion');

export default {
    users: db.collection<User>('users'),
    sessions: db.collection<Session>('sessions'),
    schedules: db.collection<Schedule>('schedules'),
};
