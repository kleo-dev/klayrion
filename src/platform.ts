export interface Platform {
    platform: 'x';
    token: string;
    secret: string;
}

export interface PostRequest {
    content: string;
    platforms: Platform[];
}
