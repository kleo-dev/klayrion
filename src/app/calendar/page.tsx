'use client';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';

import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

import '@/calendar-theme.css';
import { useEffect, useState } from 'react';
import App from '@/components/app';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { PlusCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function CalendarApp() {
    const eventsService = useState(() => createEventsServicePlugin())[0];
    const dragAndDrop = useState(() => createDragAndDropPlugin())[0];

    const calendar = useCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
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

    return (
        <App>
            <div>
                <Dialog
                    open={newPostDialogOpen}
                    onOpenChange={setNewPostDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Feature not available</DialogTitle>
                        </DialogHeader>
                        <div></div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setNewPostDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button>Submit</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <ContextMenu>
                    <ContextMenuTrigger>
                        <ScheduleXCalendar
                            calendarApp={calendar}
                            customComponents={{
                                headerContent: CalendarHeader,
                            }}
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
                    </ContextMenuContent>
                </ContextMenu>
            </div>
        </App>
    );
}

function CalendarHeader() {
    return <div className="flex flex-row w-full"></div>;
}

export default CalendarApp;
