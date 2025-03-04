'use client';

import { useEffect, useState } from 'react';
import App from '@/components/app';

import { format, parse } from 'date-fns';
import PostDialog, { today } from './postDialog';
import axios from 'axios';
import Cookies from 'js-cookie';
import Calendar, { CalendarSchedule, Event } from './calendar';
import { DATE_FORMAT } from '@/lib/types';

export default function CalendarApp() {
    const sessionId = Cookies.get('session_id') || '';
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        axios
            .get(`/api/posts/`, {
                withCredentials: true,
            })
            .then((response) => {
                const v: Event[] = response.data.schedules.map((e: any) => ({
                    time: parse(e.scheduled, DATE_FORMAT, new Date()),
                    platforms: e.platforms,
                    id: e._id,
                    title: 'Post',
                }));
                setEvents(v);
            })
            .catch((err) => {
                console.error(err);
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
                    addEvents={(e) => {
                        setEvents([...events, e]);
                    }}
                />

                <Calendar
                    setDialog={setDialog}
                    events={events}
                    setDate={setDate}
                    setEvents={setEvents}
                />
            </div>
        </App>
    );
}
