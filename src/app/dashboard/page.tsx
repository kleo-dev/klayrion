import Engagement from '@/components/engagement';
import Ideas from '@/components/ideas';
import RecentPosts from '@/components/recentPosts';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
} from '@/components/ui/sidebar';
import { DayPicker } from 'react-day-picker';

export default function Dashboard() {
    return (
        <div className="flex w-full">
            <div>
                <SidebarProvider>
                    <Sidebar className="w-64 h-full">
                        <SidebarContent className="p-6">Hello</SidebarContent>
                    </Sidebar>
                </SidebarProvider>
            </div>

            <div className="flex flex-1 flex-col p-6 px-5 md:px-10 h-max">
                <div className="w-full">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                </div>

                <div className="w-full mt-5 flex flex-col xl:flex-row gap-5 items-stretch">
                    <Engagement />
                    <div className="w-full pb-7 border rounded-2xl">
                        <Calendar
                            className="h-full w-full flex"
                            classNames={{
                                months: 'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
                                month: 'space-y-4 w-full flex flex-col',
                                table: 'w-full h-full border-collapse space-y-1',
                                head_row: '',
                                row: 'w-full mt-2',
                                day: 'px-1 py-2 rounded-xl text-xl',
                            }}
                        />
                    </div>
                </div>

                <div className="w-full mt-5 flex gap-5">
                    <div className="flex flex-col w-max gap-5">
                        <Ideas
                            ideas={[
                                {
                                    idea: 'The recent Linus tech tips drama',
                                    checked: true,
                                },
                                { idea: 'Code reviews', checked: false },
                                {
                                    idea: 'How to build charts in react',
                                    checked: false,
                                },
                            ]}
                        />
                        <Ideas
                            ideas={[
                                {
                                    idea: 'The recent Linus tech tips drama',
                                    checked: true,
                                },
                                { idea: 'Code reviews', checked: false },
                                {
                                    idea: 'How to build charts in react',
                                    checked: false,
                                },
                            ]}
                        />
                    </div>
                    <RecentPosts
                        posts={[
                            {
                                platform: 'x',
                                name: 'Leo Codes',
                                username: 'leo.codes',
                                content:
                                    "The linus tech tips drama is complex, don't know who to blame, they should try to figure this out privately",
                            },
                            {
                                platform: 'x',
                                name: 'Leo Codes',
                                username: 'leo.codes',
                                content:
                                    "Hello, world",
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
