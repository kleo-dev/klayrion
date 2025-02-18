import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface TimeSelectProps {
    date: Date;
    setDate: (newDate: Date) => void;
    className?: string;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
    date,
    setDate,
    className,
}) => {
    const times = Array.from({ length: 24 }, (_, h) =>
        [0, 15, 30, 45].map(
            (m) =>
                `${(h+1).toString().padStart(2, '0')}:${m
                    .toString()
                    .padStart(2, '0')}`
        )
    ).flat();

    const currentHour = date.getHours().toString().padStart(2, '0');
    const currentMinute = date.getMinutes();
    const nearestMinute = [0, 15, 30, 45].reduce((prev, curr) =>
        Math.abs(curr - currentMinute) < Math.abs(prev - currentMinute)
            ? curr
            : prev
    );
    const selectedTime = `${currentHour}:${nearestMinute
        .toString()
        .padStart(2, '0')}`;

    const handleTimeChange = (newTime: string) => {
        const [hour, minute] = newTime.split(':').map(Number);
        const newDate = new Date(date);
        newDate.setHours(hour, minute, 0, 0);
        setDate(newDate);
    };

    return (
        <div>
            <Select onValueChange={handleTimeChange}>
                <SelectTrigger>
                    <SelectValue
                        placeholder={selectedTime}
                        className={className}
                    />
                </SelectTrigger>
                <SelectContent>
                    {times.map((t) => (
                        <SelectItem key={t} value={t}>
                            {t}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default TimeSelect;
