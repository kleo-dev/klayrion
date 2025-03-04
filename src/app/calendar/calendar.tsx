export interface CalendarSchedule {
    date: Date;
    platforms: { user: string }[];
    id: string;
}
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import axios from 'axios';
import { Pencil, PlusCircle, Trash } from 'lucide-react';
import React from 'react';

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export interface Event {
    time: Date;
    title: string;
    id: string;
}

interface CalendarProps {
    events: Event[];
    setDate: (date: Date) => void;
    setDialog: (dialog: boolean) => void;
    setEvents: (events: Event[]) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    events,
    setDate,
    setDialog,
    setEvents,
}) => {
    return (
        <div className="grid grid-cols-[auto,repeat(7,1fr)] border text-center text-sm">
            <div className="border p-2 font-bold">Time</div>
            {days.map((day) => (
                <div key={day} className="border p-2 font-bold">
                    {day}
                </div>
            ))}

            {hours.map((hour, rowIdx) => (
                <React.Fragment key={hour}>
                    <div className="border p-2">{hour}</div>

                    {days.map((_, colIdx) => {
                        const event = events.find(
                            (e: Event) =>
                                e.time.getDay() === colIdx &&
                                e.time.getHours() === rowIdx
                        );

                        if (!event) {
                            return (
                                <ContextMenu key={`${colIdx}-${rowIdx}`}>
                                    <ContextMenuTrigger asChild>
                                        <div className="relative border h-16"></div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            onClick={() => {
                                                setDate(
                                                    new Date(2024, 3, 4, rowIdx)
                                                );
                                                setDialog(true);
                                            }}
                                        >
                                            <PlusCircle className="w-4 h-4 mr-1" />
                                            New Post
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            );
                        }

                        return (
                            <ContextMenu key={`${colIdx}-${rowIdx}`}>
                                <ContextMenuTrigger asChild>
                                    <div className="relative border h-16">
                                        {event && (
                                            <div className="absolute inset-0 bg-blue-500 text-white p-1 text-xs rounded">
                                                {event.title}
                                            </div>
                                        )}
                                    </div>
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                    <ContextMenuItem>
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Edit
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        className="text-red-600"
                                        onClick={() => {
                                            axios.delete(
                                                `/api/posts?schedule=${event.id}`
                                            );
                                            setEvents(
                                                events.filter(
                                                    (e) => e.id !== event.id
                                                )
                                            );
                                        }}
                                    >
                                        <Trash className="w-4 h-4 mr-1" />
                                        Delete
                                    </ContextMenuItem>
                                </ContextMenuContent>
                            </ContextMenu>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Calendar;
