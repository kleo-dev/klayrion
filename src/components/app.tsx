'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import {
    SidebarContent,
    SidebarProvider,
    Sidebar,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar';

import { Calendar, LayoutDashboardIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import useSmallScreen from '@/hooks/is-small';
import SettingsDropdown from './settingsDropdown';
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

const footer: {
    title: string;
    url: string;
    icon: React.ElementType;
}[] = [];

export default function App({ children }: { children?: any }) {
    const isSmall = useSmallScreen();
    const pathname = usePathname();

    return isSmall ? (
        <div className="flex flex-col relative">
            <div className="flex flex-row justify-center gap-2 items-center relative mt-2">
                {/* Navigation Items */}
                <div className="flex flex-row gap-2">
                    {items.map((item, i) => (
                        <div key={i} className="w-12 mx-auto">
                            <Link href={item.url}>
                                {pathname === item.url ? (
                                    <item.icon className="!size-full p-2 bg-foreground text-background rounded-2xl" />
                                ) : (
                                    <item.icon className="!size-full p-2 hover:bg-foreground hover:text-background rounded-2xl" />
                                )}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer Items */}
                <div className="flex flex-row gap-2">
                    {footer.map((item, i) => (
                        <div key={i} className="w-12 mx-auto">
                            <Link href={item.url}>
                                {pathname === item.url ? (
                                    <item.icon className="!size-full p-2 bg-foreground text-background rounded-2xl" />
                                ) : (
                                    <item.icon className="!size-full p-2 hover:bg-foreground hover:text-background rounded-2xl" />
                                )}
                            </Link>
                        </div>
                    ))}
                    <SettingsDropdown />
                </div>
            </div>

            {children}
        </div>
    ) : (
        <div className="flex w-full">
            <div className="md:w-28">
                <SidebarProvider open={true} defaultOpen={true}>
                    <Sidebar className="w-28">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>
                                    Klayrion v0.0.1-alpha.0
                                </SidebarGroupLabel>
                                <SidebarGroupContent className="mt-14">
                                    <SidebarMenu>
                                        {items.map((item, i) => (
                                            <SidebarMenuItem
                                                key={i}
                                                className="w-16 mx-auto"
                                            >
                                                <Link href={item.url}>
                                                    {pathname === item.url ? (
                                                        <item.icon className="!size-full p-4 bg-foreground text-background rounded-2xl" />
                                                    ) : (
                                                        <item.icon className="!size-full p-4 hover:bg-foreground hover:text-background rounded-2xl" />
                                                    )}
                                                </Link>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                        <SidebarFooter className="mb-4">
                            <SidebarMenu>
                                {footer.map((item, i) => (
                                    <SidebarMenuItem
                                        key={i}
                                        className="w-16 mx-auto"
                                    >
                                        <Link href={item.url}>
                                            {pathname === item.url ? (
                                                <item.icon className="!size-full p-4 bg-foreground text-background rounded-2xl" />
                                            ) : (
                                                <item.icon className="!size-full p-4 hover:bg-foreground hover:text-background rounded-2xl" />
                                            )}
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                                <SettingsDropdown />
                            </SidebarMenu>
                        </SidebarFooter>
                    </Sidebar>
                </SidebarProvider>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
