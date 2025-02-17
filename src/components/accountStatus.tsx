'use client';

import { PlatformKind } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PlatformIcon } from './icons';

export default function AccountStatus({
    accounts,
}: {
    accounts: { platform: PlatformKind; name: string; ok: boolean }[];
}) {
    return (
        <Card className="pb-4">
            <CardHeader>
                <CardTitle>Account status</CardTitle>
            </CardHeader>

            <CardContent className="w-full h-[100px] grid gap-2 grid-cols-3">
                {accounts.map((account, i) => (
                    <div key={i} className="flex">
                        {
                            <PlatformIcon
                                platform={account.platform}
                                width={20}
                                height={20}
                                className="ml-1"
                            />
                        }

                        {account.ok ? (
                            <p className="ml-1">{account.name}</p>
                        ) : (
                            <p className="text-[#D21F1F] ml-1">
                                {account.name}
                            </p>
                        )}

                        {/*RG version*/}
                        {/* {account.ok ? (
                            <p className="text-[#32B25C] ml-1">{account.name}</p>
                        ) : (
                            <p className="text-[#D21F1F] ml-1">
                                {account.name}
                            </p>
                        )} */}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
