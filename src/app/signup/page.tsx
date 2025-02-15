'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    return (
        // <div className="bg-white dark:bg-black w-[46%] h-screen ml-auto">
        <div className="bg-white dark:bg-black w-full h-screen flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-xl pb-2">Create an account</h1>
                <Label className="text-sm text-muted-foreground">
                    Enter your credentials below to create your account
                </Label>
                <div className="pb-5">
                    <Input
                        className="w-80 mt-6 mx-auto"
                        placeholder="Full name"
                        onChange={(event) => setName(event.target.value)}
                    />

                    <Input
                        className="w-80 mt-5 mx-auto"
                        type="email"
                        placeholder="name@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <Input
                        className="w-80 mt-5 mx-auto"
                        type="password"
                        placeholder="Enter a password"
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button
                        className="mt-5 w-80 mx-auto"
                        onClick={() => {
                            console.log('Name:', name);
                            console.log('Email:', email);
                            console.log('Password:', password);

                            axios
                                .post('/api/account/', {
                                    name,
                                    email,
                                    password,
                                })
                                .then(async (response) => {
                                    document.cookie = `session_id=${response.data.sessionId}`;
                                    console.log(
                                        'Account created with session',
                                        response.data
                                    );
                                    router.push('/dashboard');
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        }}
                    >
                        Create account
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
        // </div>
    );
}
