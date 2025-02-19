'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import TimeSelect from './timeSelect';
import { CalendarEventExternal } from '@schedule-x/calendar';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useState } from 'react';
import axios from 'axios';
import { Schedule } from '@/utils';

type PostDialogProps = {
    newPostDialogOpen: boolean;
    setNewPostDialogOpen: (b: boolean) => void;
    date: Date;
    setDate: (d: Date) => void;
    eventId: number;
    setEvents: (e: CalendarEventExternal) => void;
};

export const today = new Date();
today.setHours(0, 0, 0, 0);

export default function PostDialog({
    newPostDialogOpen,
    setNewPostDialogOpen,
    date,
    setDate,
    setEvents: addEvent,
    eventId,
}: PostDialogProps) {
    const [content, setContent] = useState('');

    return (
        <Dialog open={newPostDialogOpen} onOpenChange={setNewPostDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New post</DialogTitle>
                    <DialogDescription>
                        Schedule posts on multiple accounts
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    'w-[280px] justify-start text-left font-normal',
                                    !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    format(date, 'MMMM dd y')
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                selected={date}
                                onSelect={(d: Date | undefined) => {
                                    if (d) {
                                        const newDate = new Date(d);
                                        newDate.setHours(
                                            date.getHours(),
                                            date.getMinutes(),
                                            0,
                                            0
                                        );
                                        setDate(newDate);
                                    }
                                }}
                                mode="single"
                                disabled={(date) => date < today}
                            />
                        </PopoverContent>
                    </Popover>

                    <TimeSelect
                        date={date || new Date()}
                        setDate={setDate}
                        className=""
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Content</Label>
                    <Textarea
                        className="resize-none"
                        placeholder="Enter your content here"
                        onChange={(event) => setContent(event.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setNewPostDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            const end = new Date(date);
                            end.setHours(date.getHours() + 1);

                            addEvent({
                                title: 'Post',
                                id: eventId,
                                start: format(date, 'y-MM-dd hh:mm'),
                                end: format(end, 'y-MM-dd hh:mm'),
                            });
                            axios.put('http://localhost:3000/api/posts', {
                                scheduled: format(date, 'y-MM-dd hh:mm'),
                                account: '',
                                platforms: [],
                                content,
                            } satisfies Schedule);

                            setNewPostDialogOpen(false);
                        }}
                    >
                        Schedule post
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
