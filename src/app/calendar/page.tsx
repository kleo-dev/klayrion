'use client';

import { useEffect, useState } from 'react';
import App from '@/components/app';

import { format, parse } from 'date-fns';
import PostDialog, { today } from './postDialog';
import axios from 'axios';
import Cookies from 'js-cookie';
import Calendar, { CalendarSchedule } from './calendar';

export default function CalendarApp() {
    const [eventCount, setEventCount] = useState(0);
    const sessionId = Cookies.get('session_id') || '';
    const [events, setEvents] = useState<CalendarSchedule[]>([]);

    useEffect(() => {
        axios.get(`/api/posts/?id=${sessionId}`).then((response) => {
            const v = response.data.schedules.map((e: any) => ({
                date: parse(e.scheduled, 'yyyy-MM-dd HH:mm', new Date()),
                platforms: e.platforms,
                id: e._id,
            }));
            setEvents(v);
            setEventCount(response.data.schedules.length);
        });
    }, []);

    const [postDialog, setDialog] = useState(false);
    const [date, setDate] = useState<Date>(today);

    return (
        <App>
            <div className="flex flex-1 flex-col p-6 px-5 md:px-7 h-max">
                <PostDialog
                    date={date}
                    setDate={setDate}
                    newPostDialogOpen={postDialog}
                    setNewPostDialogOpen={setDialog}
                    setEvents={(e) => {
                        setEvents([...events, e]);
                        setEventCount(eventCount + 1);
                    }}
                    eventId={eventCount}
                    sessionId={sessionId}
                />

                <Calendar
                    setDialog={setDialog}
                    sessionId={sessionId}
                    events={events}
                    date={date}
                    setDate={setDate}
                    setEvents={setEvents}
                />
            </div>
        </App>
    );
}
