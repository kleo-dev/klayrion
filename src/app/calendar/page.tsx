'use client';

import { useEffect, useState } from 'react';
import App from '@/components/app';

import { format, parse } from 'date-fns';
import PostDialog, { today } from './postDialog';
import axios from 'axios';
import Cookies from 'js-cookie';
import Calendar, { CalendarSchedule } from './calendar';
import { DATE_FORMAT } from '@/lib/types';

export default function CalendarApp() {
    const sessionId = Cookies.get('session_id') || '';
    const [events, setEvents] = useState<CalendarSchedule[]>([]);

    useEffect(() => {
        axios
            .get(`/api/posts/`, {
                withCredentials: true,
            })
            .then((response) => {
                const v = response.data.schedules.map((e: any) => ({
                    date: parse(e.scheduled, DATE_FORMAT, new Date()),
                    platforms: e.platforms,
                    id: e._id,
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
                    setEvents={(e) => {
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
