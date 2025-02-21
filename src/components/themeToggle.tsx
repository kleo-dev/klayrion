'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { Button } from './ui/button';
import { Lightbulb } from 'lucide-react';

export default function ThemeToggle(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
    >
) {
    const { setTheme, theme } = useTheme();

    return (
        <span {...props}>
            <Button
                className="p-3"
                variant="ghost"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                <Lightbulb />
            </Button>
        </span>
    );
}
