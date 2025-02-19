'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Ideas({
    ideas,
}: {
    ideas: { idea: string; checked: boolean }[];
}) {
    return (
        <Card className="pb-4">
            <CardHeader>
                <CardTitle>Daily content Ideas</CardTitle>
            </CardHeader>

            <CardContent className="w-full h-[100px] flex gap-5 flex-col">
                {ideas.map(({ idea, checked }, i) => (
                    <div className="flex space-x-2" key={i}>
                        <Checkbox
                            id="terms"
                            onClick={(e) => e.preventDefault()}
                            checked={checked}
                        />
                        <label
                            htmlFor="terms"
                            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {idea}
                        </label>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
