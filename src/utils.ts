import { ObjectId } from 'mongodb';

export type PlatformKind = 'x' | 'linkedin';

export interface Platform {
    platform: PlatformKind;
    token: string;
    secret: string;
}

export interface PostRequest {
    account: string;
    content: string;
    platforms: Platform[];
}

export interface User {
    name: string;
    email: string;
    password: string;
    platforms: Platform[];
}

export interface Schedule extends PostRequest {
    scheduled: string;
}

export type Session = { user: string };
