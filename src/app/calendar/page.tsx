'use client';

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createViewWeek } from '@schedule-x/calendar';

import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

import '@/calendar-theme.css';
import { MouseEventHandler, useEffect, useState } from 'react';
import App from '@/components/app';

import { format, parse } from 'date-fns';
import PostDialog, { today } from './postDialog';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Schedule, ScheduleRemoveRequest, ScheduleRequest } from '@/utils';
import Calendar, { CalendarSchedule } from './calendar';

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

export default function CalendarApp() {
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

    const [events, setEvents] = useState<CalendarSchedule[]>([]);

    useEffect(() => {
        axios.get(`/api/posts/?id=${sessionId}`).then((response) => {
            setEvents(response.data.schedules as CalendarSchedule[]);
            setEventCount(response.data.schedules.length);
        });
    }, []);

    const [postDialog, setDialog] = useState(false);
    const [date, setDate] = useState<Date>(today);

    return (
        <App>
            <div>
                <PostDialog
                    date={date}
                    setDate={setDate}
                    newPostDialogOpen={postDialog}
                    setNewPostDialogOpen={setDialog}
                    setEvents={(e) => {
                        calendar.events.add(e);
                        setEventCount(eventCount + 1);
                    }}
                    eventId={eventCount}
                    sessionId={sessionId}
                />

                <Calendar
                    setDialog={setDialog}
                    sessionId={sessionId}
                    events={events}
                />
            </div>
        </App>
    );
}
