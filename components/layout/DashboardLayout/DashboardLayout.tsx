import AppSidebar from '@/components/ui/Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/Sidebar/Sidebar';
import { SidebarMenu as SidebarMenuType } from '@/types/client/ui';
import { ReactNode } from 'react';

/**
 * Props for DashboardLayout component.
 */
interface DashboardLayoutProps {
  children: ReactNode; // React children elements to be rendered inside the layout
  menuItems: SidebarMenuType;
}

/**
 * DashboardLayout is a layout component that wraps the main content with a sidebar and header.
 *
 * - Uses SidebarProvider to provide sidebar context and custom CSS variables for layout sizing.
 * - AppSidebar is rendered with "inset" variant for authenticated pages.
 * - SidebarInset wraps the children to ensure proper layout with the sidebar.
 */
const DashboardLayout = ({ children, menuItems }: DashboardLayoutProps) => {
  return (
    <SidebarProvider
      // Set custom CSS variables for sidebar width and header height
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" menuItems={menuItems} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
