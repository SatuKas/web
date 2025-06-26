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

interface NavigationMenuProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SidebarMenuGroup;
}

interface NavigationActionProps {
  items: SidebarMenuActionItem[];
  isMobile?: boolean;
}

const NavigationLink = ({
  children,
  href,
  ...props
}: PropsWithChildren<{ href?: string }> & Omit<ComponentPropsWithoutRef<typeof Link>, 'as' | 'href'>) => {
  return href ? (
    <Link href={href} {...props}>
      {children}
    </Link>
  ) : (
    <Box {...props}>{children}</Box>
  );
};

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

const NavigationMenu = ({ items, ...props }: NavigationMenuProps) => {
  const { menu, title } = items;
  const t = useTranslations();
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const isChiledActive = (item: SidebarMenuItem) => {
    return (
      item.subMenu?.some((subItem) => {
        return pathname.startsWith(subItem.url || '');
      }) || pathname === item.url
    );
  };

  return (
    <SidebarGroup {...props}>
      {title && <SidebarGroupLabel>{t(`menu.${title}` as TranslationKeys)}</SidebarGroupLabel>}
      <SidebarGroupContent className="flex flex-col gap-2 ">
        <SidebarMenu className="transition-all duration-200 animate-in slide-in-from-top-2">
          {menu.map((item) =>
            item.title !== SidebarTitle.THEME ? (
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
                      {item.subMenu && (
                        <CollapsibleTrigger asChild>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hover:cursor-pointer" />
                        </CollapsibleTrigger>
                      )}
                    </NavigationLink>
                  </SidebarMenuButton>
                  {item.action ? <NavigationAction items={item.action} isMobile={isMobile} /> : null}
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
                            {item.action ? <NavigationAction items={item.action} isMobile={isMobile} /> : null}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItemComponent>
              </Collapsible>
            ) : (
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
