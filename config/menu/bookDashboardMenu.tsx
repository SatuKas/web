/**
 * config/menu/bookDashboardMenu.tsx
 *
 * This file defines the sidebar menu configuration for the book dashboard.
 * It exports one main constants:
 * - SIDEBAR_BOOK_DASHBOARD_MENU_ITEM: Main sidebar menu structure, including nested submenus and actions.
 *
 * The menu structure is used to render navigation and actions in the sidebar UI.
 */

import { SidebarMenu, SidebarTitle } from '@/types/client/ui';
import { getBookRouteUrl } from '@/utils/url';
import { ArrowLeftRight, BookOpen, BookOpenText, LayoutGrid, LibraryBig, Scale, Settings } from 'lucide-react';

/**
 * sidebarBookDashboardMenuItem
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
export const sidebarBookDashboardMenuItem = (username: string, bookId: string): SidebarMenu => {
  return [
    {
      menu: [
        {
          title: SidebarTitle.DASHBOARD, // Dashboard main menu
          url: getBookRouteUrl(username, bookId).bookDashboardPath, // Dashboard route
          icon: <LayoutGrid />, // Dashboard icon
        },
      ],
    },
    {
      title: SidebarTitle.SETUP_BOOK, // Setup book menu group title
      menu: [
        {
          title: SidebarTitle.COA, // COA menu item
          url: getBookRouteUrl(username, bookId).bookCoaPath,
          icon: <LibraryBig />,
        },
      ],
    },
    {
      title: SidebarTitle.TRANSACTION, // Transaction menu group title
      menu: [
        {
          title: SidebarTitle.TRANSACTION, // COA menu item
          url: getBookRouteUrl(username, bookId).bookTransactionPath,
          icon: <ArrowLeftRight />,
        },
      ],
    },
    {
      title: SidebarTitle.REPORT, // Report menu group title
      menu: [
        {
          title: SidebarTitle.LEDGER, // COA menu item
          url: getBookRouteUrl(username, bookId).bookReportLedgerPath,
          icon: <BookOpen />,
        },
        {
          title: SidebarTitle.BALANCE_SHEET, // COA menu item
          url: getBookRouteUrl(username, bookId).bookReportBalanceSheetPath,
          icon: <Scale />,
        },
        {
          title: SidebarTitle.JOURNAL, // COA menu item
          url: getBookRouteUrl(username, bookId).bookReportJournalPath,
          icon: <BookOpenText />,
        },
      ],
    },
    {
      title: SidebarTitle.SETTINGS, // Settings menu group title
      menu: [
        {
          title: SidebarTitle.BOOK_SETTINGS, // Book settings menu item
          url: getBookRouteUrl(username, bookId).bookSettingsPath,
          icon: <Settings />,
        },
      ],
    },
  ];
};
