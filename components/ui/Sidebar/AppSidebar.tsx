import { APP_LOGO, APP_NAME, APP_SIDEBAR_MENU } from '@/config/app';
import { SIDEBAR_OPTIONAL_MENU_ITEM } from '@/config/menu';
import { DASHBOARD_PATH_URL } from '@/constants/routes';
import { USER_MOCK } from '@/mocks/user';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavigationMenu from './NavigationMenu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './Sidebar';
import UserMenuItem from './UserMenuItem';

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href={DASHBOARD_PATH_URL}>
                <Image src={APP_LOGO.icon} alt="logo" width={20} height={20} />
                <span className="text-base font-semibold">{APP_NAME}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {APP_SIDEBAR_MENU.map((item, index) => (
          <NavigationMenu key={`${item.title}-${index}`} items={item} />
        ))}
        <NavigationMenu items={SIDEBAR_OPTIONAL_MENU_ITEM} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserMenuItem user={USER_MOCK} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
