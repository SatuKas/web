import AppSidebar from '@/components/ui/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar/Sidebar';
import { ReactNode } from 'react';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;
