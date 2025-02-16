import AccountStatus from '@/components/accountStatus';
import Engagement from '@/components/engagement';
import Ideas from '@/components/ideas';
import RecentPosts from '@/components/recentPosts';
import App from '@/components/app';
import { Calendar } from '@/components/ui/calendar';

export default function Dashboard() {
    return (
        <App>
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
                        <AccountStatus
                            accounts={[
                                {
                                    name: 'Klesti Selimaj',
                                    ok: true,
                                    platform: 'linkedin',
                                },

                                {
                                    name: 'Klesti Selimaj',
                                    ok: true,
                                    platform: 'x',
                                },

                                {
                                    name: 'Leo Codes',
                                    ok: false,
                                    platform: 'x',
                                },
                            ]}
                        />
                    </div>
                    <RecentPosts
                        posts={[
                            {
                                platform: 'x',
                                name: 'Klesti Selimaj',
                                profileUrl:
                                    'https://media.licdn.com/dms/image/v2/D5603AQE1lZ2aRsKrhw/profile-displayphoto-shrink_400_400/B56ZRxUoLuHoAg-/0/1737068022127?e=1744848000&v=beta&t=k2T9tdzNyJMmSO8GsT6D2qQmYUQxJRsHbooywDxEDJQ',
                                content:
                                    "The linus tech tips drama is complex, don't know who to blame, they should try to figure this out privately",
                                date: new Date(),
                            },
                            {
                                platform: 'x',
                                name: 'Klesti Selimaj',
                                profileUrl:
                                    'https://media.licdn.com/dms/image/v2/D5603AQE1lZ2aRsKrhw/profile-displayphoto-shrink_400_400/B56ZRxUoLuHoAg-/0/1737068022127?e=1744848000&v=beta&t=k2T9tdzNyJMmSO8GsT6D2qQmYUQxJRsHbooywDxEDJQ',
                                content: 'Hello, world',
                                date: new Date(),
                            },
                        ]}
                    />
                </div>
            </div>
        </App>
    );
}
