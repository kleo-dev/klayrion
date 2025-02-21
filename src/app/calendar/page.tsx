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

import { PlusCircle, Trash } from 'lucide-react';

import { format, parse } from 'date-fns';
import PostDialog, { today } from './postDialog';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Schedule, ScheduleRemoveRequest, ScheduleRequest } from '@/utils';

function closestChild(children: any, clientX: number, clientY: number) {
    let closestElement = null;
    let closestDistance = Infinity;

    for (let child of children) {
        const childRect = child.getBoundingClientRect();
        const dx = Math.abs(clientX - (childRect.left + childRect.width / 2));
        const dy = Math.abs(clientY - (childRect.top + childRect.height / 2));
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestElement = child;
        }
    }

    return closestElement;
}

function CalendarApp() {
    const eventsService = useState(() => createEventsServicePlugin())[0];
    const dragAndDrop = useState(() => createDragAndDropPlugin())[0];
    const [eventCount, setEventCount] = useState(0);
    const sessionId = Cookies.get('session_id') || '';

    const calendar = useCalendarApp({
        views: [createViewWeek()],
        events: [],
        plugins: [eventsService, dragAndDrop],
        isDark: true,
    });

    useEffect(() => {
        axios.get(`/api/posts/?id=${sessionId}`).then((response) => {
            for (const [id, sched] of (
                response.data.schedules as ScheduleRequest[]
            ).entries()) {
                const date = parse(
                    sched.scheduled,
                    'y-MM-dd hh:mm',
                    new Date()
                );
                const end = new Date(date);
                end.setHours(date.getHours() + 1);

                calendar.events.add({
                    title: 'Post',
                    id,
                    start: format(date, 'y-MM-dd hh:mm'),
                    end: format(end, 'y-MM-dd hh:mm'),
                });
                setEventCount(eventCount + 1);
            }
        });
    }, []);

    const [newPostDialogOpen, setNewPostDialogOpen] = useState(false);
    const [date, setDate] = useState<Date>(today);
    const [selected, setSelected] = useState<string | null | undefined>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            window.scrollTo(0, scrollY);
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
        }, 300);
    }, [scrollY]);

    const handleDialog: MouseEventHandler<HTMLSpanElement> = (event) => {
        setScrollY(window.scrollY);

        const target = event.target as HTMLElement;

        if (target.className === 'sx__time-grid-event-time') {
            const id =
                target.parentElement?.parentElement?.getAttribute(
                    'data-event-id'
                );
            setSelected(id);

            setDate(
                parse(
                    calendar.events.get(parseInt(id || ''))?.start || '',
                    'y-MM-dd hh:mm',
                    new Date()
                )
            );
        } else {
            setSelected(null);

            try {
                const dayElement = target.closest('.sx__time-grid-day');

                const dayText = dayElement
                    ? dayElement.getAttribute('aria-label')
                    : null;

                const hourElement = closestChild(
                    target.parentElement?.children[0].children || [],
                    event.clientX,
                    event.clientY
                );

                if (!dayText || !hourElement) {
                    event.preventDefault();
                } else {
                    const toDate = parse(
                        (dayText || '') +
                            ' ' +
                            (hourElement?.textContent || ''),
                        'MMMM dd, yyyy h a',
                        new Date()
                    );
                    if (toDate instanceof Date && !isNaN(toDate.getTime()))
                        setDate(toDate);
                }
            } catch {}
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
                    setEvents={(e) => {
                        calendar.events.add(e);
                        setEventCount(eventCount + 1);
                    }}
                    eventId={eventCount}
                    sessionId={sessionId}
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
                            <p className="ml-1">New post</p>
                        </ContextMenuItem>

                        {selected ? (
                            <ContextMenuItem
                                onClick={() => {
                                    if (selected) {
                                        calendar.events.remove(
                                            parseInt(selected)
                                        );

                                        axios.delete(
                                            `/api/posts`,
                                            {
                                                params: {
                                                    id: sessionId,
                                                    date: format(
                                                        date,
                                                        'y-MM-dd hh:mm'
                                                    ),
                                                } satisfies ScheduleRemoveRequest,
                                            }
                                        );
                                    }
                                }}
                                className=""
                            >
                                <Trash className="w-4 mt-0.5 text-red-500" />{' '}
                                <p className="ml-1 text-red-500">Delete</p>
                            </ContextMenuItem>
                        ) : (
                            ''
                        )}
                    </ContextMenuContent>
                </ContextMenu>
            </div>
        </App>
    );
}

export default CalendarApp;
