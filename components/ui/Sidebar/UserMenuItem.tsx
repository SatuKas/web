'use client';

import { LogOutIcon, MoreVerticalIcon, UserCircleIcon } from 'lucide-react';

import Avatar from '@/components/ui/Avatar/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/Sidebar/Sidebar';
import { PROFILE_PATH_URL } from '@/constants/routes';
import useLogoutMutation from '@/hooks/module/auth/query/useLogoutMutation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Spinner from '../Spinner';

/**
 * UserMenuItem component displays the current user's avatar, name, and email in the sidebar,
 * and provides a dropdown menu for profile navigation and logout action.
 *
 * @param user - object containing user information
 *   @property name - string, user's display name
 *   @property email - string, user's email address
 *   @property avatar - string, URL or path to user's avatar image
 */
const UserMenuItem = ({
  user,
}: {
  user: {
    name: string; // user's display name
    email: string; // user's email address
    avatar: string; // user's avatar image url
  };
}) => {
  // Get sidebar state to determine if the device is mobile
  const { isMobile } = useSidebar();

  // Get translation function from next-intl
  const t = useTranslations();

  // Get logout function and loading state from custom hook
  const { logout, isLoadingLogout } = useLogoutMutation();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Display user avatar and info in the sidebar button */}
              <Avatar className="h-8 w-8 rounded-lg grayscale" image={user.avatar} fallback={user.name} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'} // On mobile, show dropdown below; otherwise, to the right
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {/* User info in dropdown header */}
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg" image={user.avatar} fallback={user.name} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* Link to user profile */}
              <DropdownMenuItem asChild>
                <Link href={PROFILE_PATH_URL}>
                  <UserCircleIcon />
                  {t('menu.profile')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Logout button, shows spinner when loading */}
            <DropdownMenuItem onClick={logout} disabled={isLoadingLogout}>
              {isLoadingLogout ? <Spinner /> : <LogOutIcon />}
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default UserMenuItem;
