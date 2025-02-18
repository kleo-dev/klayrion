'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

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

export function HamburgerMenu() {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTitle className="hidden">Menu</SheetTitle>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-10 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-28 flex flex-col">
                {items.map((item, i) => (
                    <div key={i} className="w-16 mx-auto">
                        <Link href={item.url}>
                            {pathname === item.url ? (
                                <item.icon className="!size-full p-2 bg-foreground text-background rounded-2xl" />
                            ) : (
                                <item.icon className="!size-full p-2 hover:bg-foreground hover:text-background rounded-2xl" />
                            )}
                        </Link>
                    </div>
                ))}

                <div className="flex-grow" />

                <SheetFooter className="mt-auto">
                    {footer.map((item, i) => (
                        <Link href={item.url} key={i}>
                            {pathname === item.url ? (
                                <item.icon className="!size-full p-2 bg-foreground text-background rounded-2xl" />
                            ) : (
                                <item.icon className="!size-full p-2 hover:bg-foreground hover:text-background rounded-2xl" />
                            )}
                        </Link>
                    ))}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default function App({ children }: { children?: any }) {
    const isSmall = useSmallScreen();
    const pathname = usePathname();

    return isSmall ? (
        <div className="flex flex-col">
            <div className="flex flex-row w-max mx-auto gap-2 items-center">
                <div className="flex flex-row w-max gap-2">
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

                <div className="flex flex-row w-max gap-2">
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
                            </SidebarMenu>
                        </SidebarFooter>
                    </Sidebar>
                </SidebarProvider>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
