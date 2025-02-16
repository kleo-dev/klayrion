export type PlatformKind = 'x' | 'linkedin';

export interface Platform {
    platform: PlatformKind;
    token: string;
    secret: string;
}

export interface PostRequest {
    content: string;
    platforms: Platform[];
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export type Session = { email: string };
