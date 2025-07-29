import AppLogo from '@/components/shared/AppLogo';
import { APP_SIDEBAR_COMMON_MENU } from '@/config/app';
import { DASHBOARD_BOOKS_PATH_URL } from '@/constants/routes';
import { SidebarMenu as SidebarMenuType } from '@/types/client/ui';
import Link from 'next/link';
import React from 'react';
import Box from '../Box';
import NavigationMenu from './NavigationMenu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from './Sidebar';
import UserMenuItem from './UserMenuItem';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menuItems: SidebarMenuType;
}

/**
 * AppSidebar component renders the main sidebar for the application.
 *
 * @param props - All props are forwarded to the Sidebar component.
 *
 * The sidebar includes:
 * - App logo and name at the top, which links to the dashboard.
 * - Main navigation menu items, rendered from APP_SIDEBAR_MENU.
 * - Optional menu items at the bottom of the menu list.
 * - User menu at the footer, showing user info and actions.
 * - SidebarRail for visual sidebar rail.
 */
const AppSidebar = ({ menuItems, ...props }: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Logo and app name, clicking this navigates to dashboard */}
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href={DASHBOARD_BOOKS_PATH_URL} className="h-11">
                <Box className="h-full">
                  <AppLogo type="text" />
                </Box>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Render main sidebar menu items */}
        {menuItems.map((item, index) => (
          <NavigationMenu
            key={`${item.title}-${index}`} // Use title and index to ensure unique key
            items={item} // items: menu group object
          />
        ))}
        {/* Render optional menu items, placed at the bottom using mt-auto */}
        <NavigationMenu items={APP_SIDEBAR_COMMON_MENU} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* User menu section, shows user info and actions */}
        <UserMenuItem />
      </SidebarFooter>
      {/* SidebarRail is a visual element for the sidebar */}
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
