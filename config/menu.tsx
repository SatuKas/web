import { DASHBOARD_PATH_URL, DUMMY_PATH_URL } from '@/constants/routes';
import { SidebarMenu, SidebarMenuGroup, SidebarTitle } from '@/types/client/ui';
import { HelpCircle, LayoutGrid, Settings, Shield } from 'lucide-react';

export const SIDEBAR_MENU_ITEM: SidebarMenu = [
  {
    menu: [
      {
        title: SidebarTitle.DASHBOARD,
        url: DASHBOARD_PATH_URL,
        icon: <LayoutGrid />,
      },
      {
        title: SidebarTitle.SETTINGS,
        icon: <Settings />,
        subMenu: [
          {
            title: SidebarTitle.ABOUT,
            url: DUMMY_PATH_URL,
          },
          {
            title: SidebarTitle.CONTACT,
            url: DUMMY_PATH_URL,
          },
          {
            title: SidebarTitle.PROFILE,
            url: DUMMY_PATH_URL,
          },
        ],
      },
      {
        title: SidebarTitle.PRIVACY,
        icon: <Shield />,
        url: DUMMY_PATH_URL,
        action: [
          {
            title: SidebarTitle.PRIVACY,
            icon: <Shield />,
            url: DUMMY_PATH_URL,
          },
        ],
      },
    ],
  },
  {
    title: SidebarTitle.HELP,
    menu: [
      {
        title: SidebarTitle.HELP,
        icon: <HelpCircle />,
      },
    ],
  },
];

export const SIDEBAR_OPTIONAL_MENU_ITEM: SidebarMenuGroup = {
  menu: [
    {
      title: SidebarTitle.THEME,
      isActive: true,
    },
    {
      title: SidebarTitle.HELP,
      isActive: true,
      url: DUMMY_PATH_URL,
      icon: <HelpCircle />,
    },
    {
      title: SidebarTitle.SETTINGS,
      isActive: true,
      url: DUMMY_PATH_URL,
      icon: <Settings />,
    },
  ],
};
