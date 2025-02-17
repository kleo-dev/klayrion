import {
    Dialog,
    DialogContent,
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

type PostDialogProps = {
    newPostDialogOpen: boolean;
    setNewPostDialogOpen: (b: boolean) => void;
    date: Date;
    setDate: (d: Date) => void;
};

export const today = new Date();
today.setHours(0, 0, 0, 0);

export default function PostDialog({
    newPostDialogOpen,
    setNewPostDialogOpen,
    date,
    setDate,
}: PostDialogProps) {
    return (
        <Dialog open={newPostDialogOpen} onOpenChange={setNewPostDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feature not available</DialogTitle>
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
                                        const newDate = new Date(d); // Clone d
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
                    <Button>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
