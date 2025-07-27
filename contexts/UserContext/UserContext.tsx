'use client';

import useGetCurrentUser from '@/hooks/module/user/query/useGetCurrentUserQuery';
import { UserData } from '@/types/client/user';
import { createContext, ReactNode } from 'react';

interface UserContextType {
  user: UserData | undefined;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user, isLoading } = useGetCurrentUser();

  const value: UserContextType = {
    user,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
