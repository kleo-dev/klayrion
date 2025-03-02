import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ScheduleRemoveRequest } from '@/utils';
import axios from 'axios';
import { format } from 'date-fns';

import { PlusCircle, Trash2 } from 'lucide-react';

export interface CalendarSchedule {
    date: Date;
    platforms: { user: string }[];
    id: string;
}

const weekdays: [string, number, number, number][] = [
    ['Mon', 2025, 2, 24],
    ['Tue', 2025, 2, 25],
    ['Wed', 2025, 2, 26],
    ['Thu', 2025, 2, 27],
    ['Fri', 2025, 2, 28],
    ['Sat', 2025, 2, 29],
    ['Sun', 2025, 3, 1],
];

const times: [string, number][] = [
    ['12 PM', 12],
    ['1 PM', 13],
    ['2 PM', 14],
    ['3 PM', 15],
    ['4 PM', 16],
    ['5 PM', 17],
    ['6 PM', 18],
    ['7 PM', 19],
    ['8 PM', 20],
    ['9 PM', 21],
    ['10 PM', 22],
    ['11 PM', 23],
];

export default function Calendar({
    setDialog,
    events,
    setDate,
    date,
    setEvents,
}: {
    setDialog: (b: boolean) => void;
    events: CalendarSchedule[];
    date: Date;
    setDate: (d: Date) => void;
    setEvents: (events: CalendarSchedule[]) => void;
}) {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 w-full h-20 mb-2">
                <div className="flex gap-2">
                    {/* Times column */}
                    <div className="w-20 flex flex-col gap-2">
                        <div className="h-24"></div>{' '}
                        {/* Empty space for alignment */}
                        <div className="grid grid-rows-10 h-full gap-2">
                            {times.map((t, j) => (
                                <div
                                    key={j}
                                    className="flex pr-2 h-16 border rounded-xl"
                                >
                                    <p className="size-max m-auto">{t[0]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-2 flex-1">
                        {weekdays.map((w, i) => (
                            <div key={i} className="flex flex-col h-full gap-2">
                                <div className="border rounded-md h-24 flex">
                                    <p className="size-max mx-auto">{w[0]}</p>
                                </div>
                                <div className="grid grid-rows-10 h-full gap-2">
                                    {times.map((t, j) => {
                                        const event = events.find((e) => {
                                            return (
                                                e.date.getFullYear() === w[1] &&
                                                e.date.getMonth() === w[2] &&
                                                e.date.getDate() === w[3] &&
                                                e.date.getHours() === t[1]
                                            );
                                        });

                                        return (
                                            <ContextMenu key={j}>
                                                <ContextMenuTrigger>
                                                    <div
                                                        className={`border rounded-xl w-full h-16 ${
                                                            event
                                                                ? 'bg-primary/20'
                                                                : ''
                                                        }`}
                                                    >
                                                        {event && (
                                                            <div className="p-2 text-sm flex items-center justify-center">
                                                                {/* <LampIcon className="h-6 w-6" /> */}
                                                            </div>
                                                        )}
                                                    </div>
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    <ContextMenuItem
                                                        onClick={() => {
                                                            setDialog(true);
                                                            setDate(
                                                                new Date(
                                                                    w[1],
                                                                    w[2],
                                                                    w[3],
                                                                    t[1],
                                                                    0,
                                                                    0
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        <PlusCircle className="mr-2 h-4 w-4" />
                                                        <p>New post</p>
                                                    </ContextMenuItem>

                                                    {event && (
                                                        <ContextMenuItem
                                                            onClick={() => {
                                                                axios
                                                                    .delete(
                                                                        `/api/posts`,
                                                                        {
                                                                            params: {
                                                                                schedule:
                                                                                    event.id,
                                                                            } satisfies ScheduleRemoveRequest,
                                                                        }
                                                                    )
                                                                    .then(
                                                                        () => {
                                                                            setEvents(
                                                                                events.filter(
                                                                                    (
                                                                                        e
                                                                                    ) =>
                                                                                        e.id !==
                                                                                        event.id
                                                                                )
                                                                            );
                                                                        }
                                                                    );
                                                            }}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                                                            <p className="text-red-500">
                                                                Delete post
                                                            </p>
                                                        </ContextMenuItem>
                                                    )}
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
