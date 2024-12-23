import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users } from 'lucide-react';
import Link from 'next/link';
import SidebarCloseButton from './ui/sidebar-close-button';

const menus = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    subMenus: null,
  },
  {
    title: 'Data Penduduk',
    icon: Users,
    url: '/penduduk',
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className='select-none z-20 hidden'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarCloseButton />
          <SidebarSeparator />
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild className='cursor-pointer'>
                    <Link href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
