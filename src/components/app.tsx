import {
    SidebarContent,
    SidebarProvider,
    Sidebar,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from '@/components/ui/sidebar';

import { Calendar, LayoutDashboardIcon, Settings } from 'lucide-react';
import Link from 'next/link';

// Menu items.
const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboardIcon,
    },
    {
        title: 'Calendar',
        url: '/calendar',
        icon: Calendar,
    },
];

const footer = [
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
    },
];

export default function App({ children }: { children?: any }) {
    return (
        <div className="flex w-full">
            <div className='md:w-28'>
                <SidebarProvider>
                    <Sidebar className="w-28">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    Klayrion v0.0.1-alpha.0
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item, i) => (
                                            <SidebarMenuItem
                                                key={i}
                                                className="w-16 mx-auto"
                                            >
                                                <Link href={item.url}>
                                                    <item.icon className="!size-full p-4 hover:bg-foreground hover:text-background rounded-2xl" />
                                                </Link>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                        <SidebarFooter className='mb-4'>
                            <SidebarMenu>
                                {footer.map((item, i) => (
                                    <SidebarMenuItem
                                        key={i}
                                        className="w-16 mx-auto"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="!size-full p-4 hover:bg-foreground hover:text-background rounded-2xl" />
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarFooter>
                    </Sidebar>
                </SidebarProvider>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
