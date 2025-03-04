/*
Request types
*/

export interface PostRequest {
    content: string;
    platforms: string[];
}

export interface ScheduleRequest extends PostRequest {
    scheduled: string;
}

export interface ScheduleRemoveRequest {
    schedule: string;
}

/*
Database types
*/

export type PlatformKind = 'x' | 'linkedin';

export interface Platform {
    platform: PlatformKind;
    token: string;
    secret: string;
}

export type Platforms = { [key: string]: Platform };

export interface User {
    name: string;
    email: string;
    password: string;
    platforms: Platforms;
}

export interface Post {
    account: string;
    content: string;
    platforms: string[];
}

export interface Schedule extends Post {
    scheduled: string;
}

export type Session = { user: string };

export const DATE_FORMAT = 'y-MM-dd hh:mm';
