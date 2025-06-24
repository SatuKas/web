import { TooltipContent } from '@/components/ui/Tooltip/Tooltip';

export type LabelDirection = 'vertical' | 'horizontal';

export type DefaultInputProps = {
  label?: string;
  labelDirection?: LabelDirection;
  name?: string;
  description?: string;
  required?: boolean;
};

export type SidebarMenuActionItem = {
  title: SidebarTitle;
  url?: string;
  icon?: React.ReactNode;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
};

export type SidebarSubMenuItem = {
  title: SidebarTitle;
  url?: string;
  icon?: React.ReactNode;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  action?: SidebarMenuActionItem[];
};

export type SidebarMenuItem = {
  title: SidebarTitle;
  url?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  subMenu?: SidebarSubMenuItem[];
  action?: SidebarMenuActionItem[];
};

export type SidebarOptionalMenuItem = {
  title: SidebarTitle;
  url?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
};

export type SidebarMenuGroup = {
  title?: SidebarTitle;
  menu: SidebarMenuItem[];
};

export type SidebarMenu = SidebarMenuGroup[];

export enum SidebarTitle {
  DASHBOARD = 'dashboard',
  SETTINGS = 'settings',
  PROFILE = 'profile',
  LOGOUT = 'logout',
  HELP = 'help',
  ABOUT = 'about',
  CONTACT = 'contact',
  TERMS = 'terms',
  PRIVACY = 'privacy',
  THEME = 'theme',
}

export type BreadcrumbLinkItem = {
  title: string;
  url?: string;
};
