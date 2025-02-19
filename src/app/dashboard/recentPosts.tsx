import { PlatformKind } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformIcon } from '@/components/icons';
import { format } from 'date-fns';

export default function RecentPosts({
    posts,
}: {
    posts: {
        platform: PlatformKind;
        profileUrl: string;
        name: string;
        date: Date;
        content: string;
    }[];
}) {
    return (
        <Card className="flex flex-col flex-grow">
            <CardHeader>
                <CardTitle>Recent posts</CardTitle>
            </CardHeader>

            <CardContent className="w-full h-full grid grid-rows-2 gap-4 items-stretch">
                {posts.map((post, i) => (
                    <div
                        key={i}
                        className="border flex flex-col h-full p-4 rounded-xl"
                    >
                        <div className="relative">
                            <div className="flex items-center w-full">
                                <img
                                    src={post.profileUrl}
                                    alt="PFP"
                                    className="size-12 rounded-full"
                                />
                                <p className="ml-4">{post.name}</p>
                                <PlatformIcon
                                    platform={post.platform}
                                    width={20}
                                    height={20}
                                    className="ml-1"
                                />
                                <p className="ml-1 text-muted-foreground">
                                    {format(post.date, 'MMM dd h:mm aa')}
                                </p>
                            </div>
                        </div>
                        <div className="w-full mt-2 flex-1">
                            <p className="line-clamp-2">{post.content}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
