export function generateUrlSafeString(length = 16) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

export interface Platform {
    platform: 'x';
    token: string;
    secret: string;
}

export interface PostRequest {
    content: string;
    platforms: Platform[];
}

export interface User {
    email: string;
    password: string;
}

export type Session = { email: string };
