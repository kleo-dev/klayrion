import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { ScheduleRemoveRequest } from '@/utils';
import axios from 'axios';
import { format } from 'date-fns';

import { PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';

export interface CalendarSchedule {
    date: Date;
    platforms: { user: string }[];
}

const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
];

const times = ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];

export default function Calendar({
    setDialog,
    sessionId,
    events,
}: {
    setDialog: (b: boolean) => void;
    sessionId: string;
    events: CalendarSchedule[];
}) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 w-full h-20 mb-2">
                <div className="grid grid-cols-7 ml-20">
                    {weekdays.map((w, i) => (
                        <div key={i} className="border">
                            <p className="w-max mx-auto">{w}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
                {times.map((w, i) => (
                    <div key={i} className="flex">
                        <p className="w-20 border py-4">
                            <p className="w-max mx-auto">{w}</p>
                        </p>
                        <div className="grid grid-cols-7 w-full ml-1">
                            {weekdays.map((w, i) => (
                                <div key={i} className="border py-4"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // <div className="grid grid-cols-1 w-full">
    //             <div className="grid grid-cols-7">
    //                 {weekdays.map((w, i) => (
    //                     <div key={i}>
    //                         <p className="w-max mx-auto">{w}</p>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>

    // return (
    //     <ContextMenu>
    //         <ContextMenuTrigger></ContextMenuTrigger>
    //         <ContextMenuContent>
    //             <ContextMenuItem
    //                 onClick={() => {
    //                     setDialog(true);
    //                 }}
    //             >
    //                 <PlusCircle className="w-4 mt-0.5" />{' '}
    //                 <p className="ml-1">New post</p>
    //             </ContextMenuItem>

    //             {selected ? (
    //                 <ContextMenuItem
    //                     onClick={() => {
    //                         if (selected) {
    //                             axios.delete(`/api/posts`, {
    //                                 params: {
    //                                     id: sessionId,
    //                                     date: format(
    //                                         events[selected].date,
    //                                         'y-MM-dd hh:mm'
    //                                     ),
    //                                 } satisfies ScheduleRemoveRequest,
    //                             });
    //                         }
    //                     }}
    //                     className=""
    //                 >
    //                     <Trash className="w-4 mt-0.5 text-red-500" />{' '}
    //                     <p className="ml-1 text-red-500">Delete</p>
    //                 </ContextMenuItem>
    //             ) : (
    //                 ''
    //             )}
    //         </ContextMenuContent>
    //     </ContextMenu>
    // );
}
