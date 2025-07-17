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
import { useUser } from '@/contexts/UserContext';
import useLogoutMutation from '@/hooks/module/auth/query/useLogoutMutation';
import { USER_MOCK } from '@/mocks/user';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import Skeleton from '../Skeleton';
import Spinner from '../Spinner';
import Stack from '../Stack';

/**
 * UserMenuItem component displays the current user's avatar, name, and email in the sidebar,
 * and provides a dropdown menu for profile navigation and logout action.
 *
 * @param user - object containing user information
 *   @property name - string, user's display name
 *   @property email - string, user's email address
 *   @property avatar - string, URL or path to user's avatar image
 */
const UserMenuItem = () => {
  // Get sidebar state to determine if the device is mobile
  const { isMobile } = useSidebar();
  const { user, isLoading: isLoadingUser } = useUser();

  const userProfile = useMemo(() => {
    return {
      name: user?.name || '-',
      email: user?.email || '-',
      avatar: USER_MOCK.avatar,
    };
  }, [user]);

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
              <Avatar
                className="h-8 w-8 rounded-lg grayscale"
                image={userProfile.avatar}
                fallback={userProfile.name}
                isLoading={isLoadingUser}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                {isLoadingUser ? (
                  <Stack gap={1}>
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2.5 w-24" />
                  </Stack>
                ) : (
                  <>
                    <span className="truncate font-medium">{userProfile.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{userProfile.email}</span>
                  </>
                )}
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
                <Avatar
                  className="h-8 w-8 rounded-lg"
                  image={userProfile.avatar}
                  fallback={userProfile.name}
                  isLoading={isLoadingUser}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userProfile.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{userProfile.email}</span>
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
