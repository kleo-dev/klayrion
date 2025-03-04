import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { Lightbulb, Settings } from 'lucide-react';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default function SettingsDropdown() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="!select-none">
                <div className="w-12 mx-auto !select-none">
                    <Settings className="!size-full p-2 hover:bg-foreground hover:text-background rounded-2xl" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        axios
                            .delete('/api/auth/', {
                                withCredentials: true,
                            })
                            .then(() => {
                                redirect('/login');
                            });
                    }}
                >
                    Log Out
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                >
                    <Lightbulb className="w-4 h-4" />
                    Switch Theme
                </DropdownMenuItem>
                {/* TODO: Make the items functional */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
