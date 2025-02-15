'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function Login() {
    return (
        // <div className="bg-white dark:bg-black w-[46%] h-screen ml-auto">
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
                    />

                    <Input
                        className="w-80 mt-5 mx-auto"
                        type="password"
                        placeholder="Your password"
                    />

                    <Button className="mt-5 w-80 mx-auto">Log in</Button>
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
