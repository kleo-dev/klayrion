'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { toast } = useToast();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const { sessionId } = (
                await axios.post('/api/session/', {
                    email,
                    password,
                })
            ).data;

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
                        onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                                await handleLogin();
                            }
                        }}
                    />

                    <Button className="mt-5 w-80 mx-auto" onClick={handleLogin}>
                        Log in
                    </Button>

                    <div className="relative mt-5">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Alternatively
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Button
                            className="mt-5 w-80 mx-auto"
                            variant="outline"
                            onClick={() => router.push('/signup')}
                        >
                            <div className="flex items-center gap-2 flex-row">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 512"
                                    fill="currentColor"
                                >
                                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                </svg>
                                Create account
                            </div>
                        </Button>
                        <Button className="mt-5 w-80 mx-auto" variant="outline">
                            <div className="flex items-center gap-2 flex-row">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512"
                                    fill="currentColor"
                                >
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                </svg>
                                Continue with Google
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
