import DashboardWorkspaceHeader from '@/components/shared/DashboardWorkspaceHeader';
import Box from '@/components/ui/Box';
import Stack from '@/components/ui/Stack';
import { ReactNode } from 'react';

/**
 * Props for DashboardWorkspaceLayout component.
 */
interface DashboardWorkspaceLayoutProps {
  children: ReactNode; // React children elements to be rendered inside the layout
}

/**
 * DashboardWorkspaceLayout is a layout component that wraps the main content.
 */
const DashboardWorkspaceLayout = ({ children }: DashboardWorkspaceLayoutProps) => {
  return (
    <Stack>
      <DashboardWorkspaceHeader />
      <Box className="w-full flex min-h-[calc(100vh-112px)]">{children}</Box>
    </Stack>
  );
};

export default DashboardWorkspaceLayout;
