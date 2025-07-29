import { DASHBOARD_PATH_URL } from '@/constants/routes';
import { SidebarMenuGroup, SidebarTitle } from '@/types/client/ui';
import { LayoutTemplate } from 'lucide-react';

/**
 * SIDEBAR_COMMON_MENU_ITEM
 *
 * Common sidebar menu group, usually for quick settings or secondary actions.
 *
 * Structure:
 * - menu: Array of optional menu items.
 *   - title: Menu item title (SidebarTitle enum).
 *   - isActive: Boolean, whether the menu item is active/visible.
 *   - url: (optional) Navigation path for the menu item.
 *   - icon: (optional) Icon component for the menu item.
 */
export const SIDEBAR_COMMON_MENU_ITEM: SidebarMenuGroup = {
  menu: [
    {
      title: SidebarTitle.THEME, // Theme switcher
      isActive: true,
    },
    {
      title: SidebarTitle.WORKSPACE, // Workspace quick access
      isActive: true,
      url: DASHBOARD_PATH_URL,
      icon: <LayoutTemplate />,
    },
  ],
};
