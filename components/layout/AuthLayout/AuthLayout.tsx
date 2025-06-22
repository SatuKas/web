import Box from '@/components/ui/Box';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <Box>{children}</Box>;
};

export default AuthLayout;
