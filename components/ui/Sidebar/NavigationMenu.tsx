'use client';

import ThemeToggle from '@/components/shared/ThemeToggle';
import { ThemeIcon } from '@/components/shared/ThemeToggle/ThemeToggle';
import Box from '@/components/ui/Box';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { TranslationKeys } from '@/types/client/locale';
import { SidebarMenuActionItem, SidebarMenuGroup, SidebarTitle } from '@/types/client/ui';
import { ChevronRight, Ellipsis } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
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

const NavigationAction = ({ items }: NavigationActionProps) => {
  const t = useTranslations();
  const { isMobile } = useSidebar();
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
          <DropdownMenuItem key={action.title}>
            {action.icon}
            <span className="select-none">{t(`sidebar.${action.title}` as TranslationKeys)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavigationMenu = ({ items, ...props }: NavigationMenuProps) => {
  const { menu, title } = items;
  const t = useTranslations();

  return (
    <SidebarGroup {...props}>
      {title && <SidebarGroupLabel>{t(`sidebar.${title}` as TranslationKeys)}</SidebarGroupLabel>}
      <SidebarGroupContent className="flex flex-col gap-2 ">
        <SidebarMenu className="transition-all duration-200 animate-in slide-in-from-top-2">
          {menu.map((item) =>
            item.title !== SidebarTitle.THEME ? (
              <Collapsible key={item.title} asChild className="group/collapsible">
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <NavigationLink href={item.url}>
                      {item.icon}
                      <span className="select-none">{t(`sidebar.${item.title}` as TranslationKeys)}</span>
                      {item.subMenu && (
                        <CollapsibleTrigger asChild>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hover:cursor-pointer" />
                        </CollapsibleTrigger>
                      )}
                    </NavigationLink>
                  </SidebarMenuButton>
                  {item.action ? <NavigationAction items={item.action} /> : null}
                  {item.subMenu ? (
                    <CollapsibleContent>
                      <SidebarMenuSub className="transition-all duration-200 animate-in slide-in-from-top-2">
                        {item.subMenu?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <NavigationLink href={subItem.url}>
                                <span className="select-none">{t(`sidebar.${subItem.title}` as TranslationKeys)}</span>
                              </NavigationLink>
                            </SidebarMenuSubButton>
                            {item.action ? <NavigationAction items={item.action} /> : null}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <ThemeToggle key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <ThemeIcon /> {t('common.theme.title')}
                  </SidebarMenuButton>
                </ThemeToggle>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavigationMenu;
