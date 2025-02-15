import { PlatformKind } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function RecentPosts({
    posts,
}: {
    posts: {
        platform: PlatformKind;
        name: string;
        username: string;
        content: string;
    }[];
}) {
    return (
        <Card className="flex flex-col flex-grow">
            <CardHeader>
                <CardTitle>Recent posts</CardTitle>
            </CardHeader>

            <CardContent className="w-full flex flex-col gap-5">
                {posts.map((post, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col w-full border p-3 rounded-xl"
                    >
                        <div className="relative">
                            <div className="flex items-center w-full">
                                <img
                                    src="/pfp"
                                    alt="PFP"
                                    className="size-12 rounded-full"
                                />
                                <p className="ml-4">{post.name}</p>
                            </div>
                        </div>
                        <div className="w-full mt-2">
                            <p>{post.content}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
