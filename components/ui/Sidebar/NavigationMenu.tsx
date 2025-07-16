'use client';

import ThemeToggle from '@/components/shared/ThemeToggle';
import { ThemeIcon } from '@/components/shared/ThemeToggle/ThemeToggle';
import Box from '@/components/ui/Box';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { TranslationKeys } from '@/types/client/locale';
import { SidebarMenuActionItem, SidebarMenuGroup, SidebarMenuItem, SidebarTitle } from '@/types/client/ui';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem as SidebarMenuItemComponent,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from './Sidebar';

/**
 * Props for NavigationMenu component.
 * @property items - Sidebar menu group data (contains menu items and group title)
 * (other props inherited from SidebarGroup)
 */
interface NavigationMenuProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SidebarMenuGroup; // Sidebar menu group data
}

/**
 * Props for NavigationAction component.
 * @property items - List of action items (e.g. edit, delete, etc)
 * @property isMobile - Optional, if true, menu will be rendered for mobile context
 */
interface NavigationActionProps {
  items: SidebarMenuActionItem[]; // List of action items
  isMobile?: boolean; // Is this rendered in mobile sidebar
}

/**
 * NavigationLink
 * Wrapper for navigation links in sidebar.
 * If href is provided, renders a Next.js Link.
 * If not, renders a Box as a fallback.
 * On mobile, clicking a link will close the sidebar.
 */
const NavigationLink = ({
  children,
  href,
  ...props
}: PropsWithChildren<{ href?: string }> & Omit<ComponentPropsWithoutRef<typeof Link>, 'as' | 'href'>) => {
  const { isMobile, setOpenMobile } = useSidebar();
  return href ? (
    <Link
      href={href}
      onClick={() => {
        // On mobile, close the sidebar after navigation
        if (isMobile) {
          setOpenMobile(false);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <Box {...props}>{children}</Box>
  );
};

/**
 * NavigationAction
 * Renders a dropdown menu for sidebar action items (e.g. more actions).
 * @param items - List of action items to display in dropdown
 * @param isMobile - If true, dropdown opens at bottom, else at right
 */
const NavigationAction = ({ items, isMobile }: NavigationActionProps) => {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover className="data-[state=open]:bg-accent rounded-sm">
          <Ellipsis />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-24 rounded-lg"
        side={isMobile ? 'bottom' : 'right'}
        align={isMobile ? 'end' : 'start'}
      >
        {items.map((action) => (
          <DropdownMenuItem key={action.title} asChild>
            <NavigationLink href={action.url}>
              {action.icon}
              <span className="select-none">{t(`menu.${action.title}` as TranslationKeys)}</span>
            </NavigationLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * NavigationMenu
 * Main sidebar navigation menu component.
 * Renders menu groups, menu items, submenus, and theme toggle.
 * Handles active state and submenu open state based on current pathname.
 */
const NavigationMenu = ({ items, ...props }: NavigationMenuProps) => {
  const { menu, title } = items;
  const t = useTranslations();
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  /**
   * Checks if a menu item or any of its submenus is active (matches current pathname).
   * @param item - Sidebar menu item
   * @returns true if active, false otherwise
   */
  const isChiledActive = (item: SidebarMenuItem) => {
    // Check if any submenu is active, or the item itself is active
    return (
      item.subMenu?.some((subItem) => {
        return pathname.startsWith(subItem.url || '');
      }) || pathname === item.url
    );
  };

  return (
    <SidebarGroup {...props}>
      {/* Render group label if title exists */}
      {title && <SidebarGroupLabel>{t(`menu.${title}` as TranslationKeys)}</SidebarGroupLabel>}
      <SidebarGroupContent className="flex flex-col gap-2 ">
        <SidebarMenu className="transition-all duration-200 animate-in slide-in-from-top-2">
          {menu.map((item) =>
            item.title !== SidebarTitle.THEME ? (
              // Collapsible for menu item with possible submenu
              <Collapsible key={item.title} asChild defaultOpen={isChiledActive(item)} className="group/collapsible">
                <SidebarMenuItemComponent key={item.title}>
                  <SidebarMenuButton
                    tooltip={t(`menu.${item.title}` as TranslationKeys)}
                    asChild
                    isActive={pathname === item.url}
                  >
                    <NavigationLink href={item.url}>
                      {item.icon}
                      <span className="select-none">{t(`menu.${item.title}` as TranslationKeys)}</span>
                      {/* Show chevron if has submenu */}
                      {item.subMenu && (
                        <CollapsibleTrigger asChild>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hover:cursor-pointer" />
                        </CollapsibleTrigger>
                      )}
                    </NavigationLink>
                  </SidebarMenuButton>
                  {/* Render action dropdown if item has actions */}
                  {item.action ? <NavigationAction items={item.action} isMobile={isMobile} /> : null}
                  {/* Render submenu if exists */}
                  {item.subMenu ? (
                    <CollapsibleContent>
                      <SidebarMenuSub className="transition-all duration-200 animate-in slide-in-from-top-2">
                        {item.subMenu?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <NavigationLink href={subItem.url}>
                                <span className="select-none">{t(`menu.${subItem.title}` as TranslationKeys)}</span>
                              </NavigationLink>
                            </SidebarMenuSubButton>
                            {/* Render action dropdown for submenu if parent has actions */}
                            {item.action ? <NavigationAction items={item.action} isMobile={isMobile} /> : null}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItemComponent>
              </Collapsible>
            ) : (
              // Special case: Theme toggle menu item
              <SidebarMenuItemComponent key={item.title}>
                <ThemeToggle key={item.title} isMobile={isMobile}>
                  <SidebarMenuButton tooltip={t('common.theme.title')}>
                    <ThemeIcon /> {t('common.theme.title')}
                  </SidebarMenuButton>
                </ThemeToggle>
              </SidebarMenuItemComponent>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavigationMenu;
