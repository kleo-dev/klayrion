'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { toast } = useToast();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        async () => {
            try {
                const { sessionId } = (
                    await axios.post('/api/session/', {
                        email,
                        password,
                    })
                ).data;

                cookies.set('session_id', sessionId);

                router.replace('/dashboard');
            } catch (err: any) {
                toast({
                    title: 'Uh oh! Something went wrong.',
                    description: err.response
                        ? err.response.data.message
                        : String(err),
                });
            }
        };
    };

    return (
        <div className="bg-white dark:bg-black w-full h-screen flex justify-center items-center">
            <div className="text-center">
                <div className="pb-5">
                    <h1 className="text-xl pb-2">Log in to your account</h1>
                    <Label className="text-sm text-muted-foreground">
                        Enter your credentials below to access your account
                    </Label>
                    <Input
                        className="w-80 mt-5 mx-auto"
                        type="email"
                        placeholder="name@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <Input
                        className="w-80 mt-5 mx-auto"
                        type="password"
                        placeholder="Your password"
                        onChange={(event) => setPassword(event.target.value)}
                        onClick={handleLogin}
                    />

                    <Button className="mt-5 w-80 mx-auto" onClick={handleLogin}>
                        Log in
                    </Button>
                </div>
                <div className="w-72 mx-auto">
                    <Label className="mt-3 text-sm text-muted-foreground break-words">
                        By clicking continue, you agree to our{' '}
                        <Link href="/terms" className="underline">
                            Terms of Service
                        </Link>{' '}
                        {'and '}
                        <Link href="/privacy" className="underline">
                            Privacy Policy
                        </Link>
                        .
                    </Label>
                </div>
            </div>
        </div>
    );
}
