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
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
    },
];

export default function App({ children }: { children?: any }) {
    return (
        <div className="flex w-full">
            <div>
                <SidebarProvider>
                    <Sidebar>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    Klayrion v0.0.1-alpha.0
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <Link
                                                        href={item.url}
                                                        className="font-semibold"
                                                    >
                                                        <item.icon />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </SidebarProvider>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
