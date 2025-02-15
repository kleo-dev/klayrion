import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

export default async function Home() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('session_id');
    if (sessionId) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }
    return 'redirecting...';
}
