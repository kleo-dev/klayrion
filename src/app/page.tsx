'use client';

import { PostRequest } from '@/platform';

export default function Home() {
    const test: PostRequest = {
        content: 'Hello, World - Idk, Made this post for testing my API lol',
        platforms: [],
    };

    return (
        <button
            className="w-max mx-auto my-auto"
            onClick={async () => {
                await fetch('/api/posts', {
                    method: 'POST',
                    body: JSON.stringify(test),
                });
            }}
        >
            Post now
        </button>
    );
}
