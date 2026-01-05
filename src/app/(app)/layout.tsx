import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/lib/data';
import { Home, PlusSquare, Shield, Users, Trophy, Settings, LogOut } from 'lucide-react';
import { LogoIcon } from '@/components/icons/logo-icon';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/quests/create', icon: PlusSquare, label: 'New Quest' },
    { href: '/rival', icon: Shield, label: 'Rival' },
    { href: '/guilds', icon: Users, label: 'Guilds' },
    { href: '/summary', icon: Trophy, label: 'Daily Summary' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <LogoIcon className="w-8 h-8 text-primary" />
              <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">QuestVerse</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      tooltip={item.label}
                      className="font-semibold"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">
             <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/login" passHref>
                    <SidebarMenuButton tooltip="Logout" className="font-semibold text-muted-foreground hover:text-destructive">
                      <LogOut />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <div className="flex items-center gap-3 p-2">
                        <Avatar className="h-10 w-10 border-2 border-foreground">
                            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-bold">{mockUser.name}</span>
                            <span className="text-sm text-muted-foreground">Level {mockUser.level}</span>
                        </div>
                    </div>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
