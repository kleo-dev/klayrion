import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { PlusCircle, Trash2 } from 'lucide-react';
import axios from 'axios';

export interface CalendarSchedule {
    date: Date;
    platforms: { user: string }[];
    id: string;
}

// Function to get the current week's dates (Monday - Sunday)
const getCurrentWeek = (): { label: string; date: Date }[] => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Monday start

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + mondayOffset + i);
        return {
            label: date.toLocaleDateString('en-US', { weekday: 'short' }), // 'Mon', 'Tue', etc.
            date,
        };
    });
};

// Time slots from 12 PM to 11 PM
const times: { label: string; hour: number }[] = Array.from(
    { length: 12 },
    (_, i) => ({
        label: `${(i + 12) % 12 || 12} PM`, // '12 PM', '1 PM', ..., '11 PM'
        hour: i + 12,
    })
);

export default function Calendar({
    setDialog,
    events,
    setDate,
    setEvents,
}: {
    setDialog: (b: boolean) => void;
    events: CalendarSchedule[];
    setDate: (d: Date) => void;
    setEvents: (events: CalendarSchedule[]) => void;
}) {
    const weekdays = getCurrentWeek();

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 w-full h-20 mb-2">
                <div className="flex gap-2">
                    {/* Time Labels */}
                    <div className="w-20 flex flex-col gap-2">
                        <div className="h-24"></div>{' '}
                        {/* Empty space for alignment */}
                        <div className="grid grid-rows-12 h-full gap-2">
                            {times.map((time) => (
                                <div
                                    key={time.hour}
                                    className="flex pr-2 h-16 border rounded-xl"
                                >
                                    <p className="size-max m-auto">
                                        {time.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 flex-1">
                        {weekdays.map((weekday) => (
                            <div
                                key={weekday.date.toDateString()}
                                className="flex flex-col h-full gap-2"
                            >
                                {/* Day Header */}
                                <div className="border rounded-md h-24 flex">
                                    <p className="size-max mx-auto">
                                        {weekday.label}
                                    </p>
                                </div>

                                {/* Time Slots */}
                                <div className="grid grid-rows-12 h-full gap-2">
                                    {times.map((time) => {
                                        const event = events.find(
                                            (e) =>
                                                e.date.getFullYear() ===
                                                    weekday.date.getFullYear() &&
                                                e.date.getMonth() ===
                                                    weekday.date.getMonth() &&
                                                e.date.getDate() ===
                                                    weekday.date.getDate() &&
                                                e.date.getHours() === time.hour
                                        );

                                        return (
                                            <ContextMenu
                                                key={`${weekday.date.toDateString()}-${
                                                    time.hour
                                                }`}
                                            >
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
                                                                {/* Event indicator */}
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
                                                                    weekday.date.getFullYear(),
                                                                    weekday.date.getMonth(),
                                                                    weekday.date.getDate(),
                                                                    time.hour,
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
                                                                            },
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
