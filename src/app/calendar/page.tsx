'use client';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createViewWeek } from '@schedule-x/calendar';

import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

import '@/calendar-theme.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import App from '@/components/app';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { PlusCircle } from 'lucide-react';

import { parse } from 'date-fns';
import PostDialog, { today } from '@/components/postDialog';

function CalendarApp() {
    const eventsService = useState(() => createEventsServicePlugin())[0];
    const dragAndDrop = useState(() => createDragAndDropPlugin())[0];

    const calendar = useCalendarApp({
        views: [createViewWeek()],
        events: [
            {
                id: '1',
                title: 'Linus tech tips drama',
                start: '2025-02-16 01:00',
                end: '2025-02-16 02:00',
            },
        ],
        plugins: [eventsService, dragAndDrop],
        isDark: true,
    });

    useEffect(() => {
        console.log(eventsService.getAll());
    }, [eventsService]);

    const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);
    const [date, setDate] = useState<Date>(today);

    const handleDialog: MouseEventHandler<HTMLSpanElement> = (event) => {
        const target = event.target as HTMLElement;

        let hourElement = null;
        let closestDistance = Infinity;
        const children = target.parentElement?.children[0].children || [];

        for (let child of children) {
            const childRect = child.getBoundingClientRect();
            const dx = Math.abs(
                event.clientX - (childRect.left + childRect.width / 2)
            );
            const dy = Math.abs(
                event.clientY - (childRect.top + childRect.height / 2)
            );
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < closestDistance) {
                closestDistance = distance;
                hourElement = child;
            }
        }

        const dayElement = target.closest('.sx__time-grid-day');

        const dayText = dayElement
            ? dayElement.getAttribute('aria-label')
            : null;

        if (!dayText || !hourElement) {
            event.preventDefault();
        } else {
            setDate(
                parse(
                    (dayText || '') + ' ' + (hourElement?.textContent || ''),
                    'MMMM dd, yyyy h a',
                    new Date()
                )
            );
        }
    };

    return (
        <App>
            <div>
                <PostDialog
                    date={date}
                    setDate={setDate}
                    newPostDialogOpen={newPostDialogOpen}
                    setNewPostDialogOpen={setNewPostDialogOpen}
                />
                <ContextMenu>
                    <ContextMenuTrigger onContextMenu={handleDialog}>
                        <ScheduleXCalendar
                            calendarApp={calendar}
                            customComponents={{}}
                        />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={() => {
                                setNewPostDialogOpen(true);
                            }}
                        >
                            <PlusCircle className="w-4 mt-0.5" />{' '}
                            <p className="ml-1">New post</p>x
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
        </App>
    );
}

export default CalendarApp;
