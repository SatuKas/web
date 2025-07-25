'use client';

import { LogOutIcon, UserRoundCog } from 'lucide-react';

import Avatar from '@/components/ui/Avatar/Avatar';
import Button from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Spinner from '@/components/ui/Spinner';
import { ACCOUNT_SETTINGS_PATH_URL } from '@/constants/routes';
import { useUser } from '@/contexts/UserContext';
import useLogoutMutation from '@/hooks/module/auth/query/useLogoutMutation';
import { USER_MOCK } from '@/mocks/user';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';

/**
 * ProfileDropdownMenu component displays the current user's avatar, name, and email in the header,
 * and provides a dropdown menu for profile navigation and logout action.
 *
 * @param user - object containing user information
 *   @property name - string, user's display name
 *   @property email - string, user's email address
 *   @property avatar - string, URL or path to user's avatar image
 */
const ProfileDropdownMenu = () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="ghost" className="p-0 h-8 w-8 rounded-full">
          <Avatar
            className="h-8 w-8 grayscale"
            image={userProfile.avatar}
            fallback={userProfile.name}
            isLoading={isLoadingUser}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
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
            <Link href={ACCOUNT_SETTINGS_PATH_URL}>
              <UserRoundCog />
              {t('menu.accountSettings')}
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
  );
};

export default ProfileDropdownMenu;
