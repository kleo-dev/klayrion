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
    setEvents,
    eventId,
}: PostDialogProps) {
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

                            setEvents({
                                title: 'My title',
                                id: eventId,
                                start: format(date, 'y-MM-dd hh:mm'),
                                end: format(end, 'y-MM-dd hh:mm'),
                                description: '',
                            });

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
