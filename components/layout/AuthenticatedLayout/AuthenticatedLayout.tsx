import { UserProvider } from '@/contexts/UserContext';
import { ReactNode } from 'react';

/**
 * Props for AuthenticatedLayout component.
 */
interface AuthenticatedLayoutProps {
  children: ReactNode; // React children elements to be rendered inside the layout
}

/**
 * AuthenticatedLayout wraps the main content with a UserProvider.
 */
const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AuthenticatedLayout;
