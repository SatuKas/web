/**
 * config/menu.tsx
 *
 * This file defines the sidebar menu configuration for the application.
 * It exports two main constants:
 * - SIDEBAR_MENU_ITEM: Main sidebar menu structure, including nested submenus and actions.
 * - SIDEBAR_OPTIONAL_MENU_ITEM: Optional sidebar menu items, such as theme and help.
 *
 * The menu structure is used to render navigation and actions in the sidebar UI.
 */

import { DASHBOARD_BOOKS_PATH_URL, DUMMY_PATH_URL } from '@/constants/routes';
import { SidebarMenu, SidebarMenuGroup, SidebarTitle } from '@/types/client/ui';
import { HelpCircle, LayoutGrid, Settings, Shield } from 'lucide-react';

/**
 * SIDEBAR_MENU_ITEM
 *
 * Main sidebar menu configuration.
 *
 * Structure:
 * - Each object in the array represents a menu group.
 * - menu: Sidebar menu items array.
 *   - title: Menu item title (SidebarTitle enum).
 *   - url: (optional) Navigation path for the menu item.
 *   - icon: (optional) Icon component for the menu item.
 *   - subMenu: (optional) Array of submenu items.
 *   - action: (optional) Array of action items related to the menu.
 */
export const SIDEBAR_MENU_ITEM: SidebarMenu = [
  {
    menu: [
      {
        title: SidebarTitle.DASHBOARD, // Dashboard main menu
        url: DASHBOARD_BOOKS_PATH_URL, // Dashboard route
        icon: <LayoutGrid />, // Dashboard icon
      },
      {
        title: SidebarTitle.SETTINGS, // Settings main menu
        icon: <Settings />, // Settings icon
        subMenu: [
          {
            title: SidebarTitle.ABOUT, // About submenu
            url: DUMMY_PATH_URL,
          },
          {
            title: SidebarTitle.CONTACT, // Contact submenu
            url: DUMMY_PATH_URL,
          },
          {
            title: SidebarTitle.PROFILE, // Profile submenu
            url: DUMMY_PATH_URL,
          },
        ],
      },
      {
        title: SidebarTitle.PRIVACY, // Privacy main menu
        icon: <Shield />, // Privacy icon
        url: DUMMY_PATH_URL,
        action: [
          {
            title: SidebarTitle.PRIVACY, // Privacy action (could be used for quick access)
            icon: <Shield />,
            url: DUMMY_PATH_URL,
          },
        ],
      },
    ],
  },
  {
    title: SidebarTitle.HELP, // Help menu group title
    menu: [
      {
        title: SidebarTitle.HELP, // Help menu item
        icon: <HelpCircle />,
      },
    ],
  },
];

/**
 * SIDEBAR_OPTIONAL_MENU_ITEM
 *
 * Optional sidebar menu group, usually for quick settings or secondary actions.
 *
 * Structure:
 * - menu: Array of optional menu items.
 *   - title: Menu item title (SidebarTitle enum).
 *   - isActive: Boolean, whether the menu item is active/visible.
 *   - url: (optional) Navigation path for the menu item.
 *   - icon: (optional) Icon component for the menu item.
 */
export const SIDEBAR_OPTIONAL_MENU_ITEM: SidebarMenuGroup = {
  menu: [
    {
      title: SidebarTitle.THEME, // Theme switcher
      isActive: true,
    },
    {
      title: SidebarTitle.HELP, // Help quick access
      isActive: true,
      url: DUMMY_PATH_URL,
      icon: <HelpCircle />,
    },
    {
      title: SidebarTitle.SETTINGS, // Settings quick access
      isActive: true,
      url: DUMMY_PATH_URL,
      icon: <Settings />,
    },
  ],
};
