import { SiteHeader } from '@/components/ui/Sidebar/SiteHeader';
import Stack from '@/components/ui/Stack';
import { BreadcrumbLinkItem } from '@/types/client/ui';
import { ReactNode } from 'react';

/**
 * Props for MainPageLayout component
 */
interface MainPageLayoutProps {
  children: ReactNode; // Content to be rendered inside the layout
  breadcrumb: BreadcrumbLinkItem[]; // Array of breadcrumb items for navigation
}

/**
 * MainPageLayout is a layout component that wraps the main content of a page.
 * It displays a SiteHeader with breadcrumb navigation and wraps the children with padding using Stack.
 *
 * @param {MainPageLayoutProps} props - Props containing children and breadcrumb
 */
const MainPageLayout = ({ children, breadcrumb }: MainPageLayoutProps) => {
  return (
    <>
      {/* Render the site header with breadcrumb navigation */}
      <SiteHeader breadcrumb={breadcrumb} />
      {/* Wrap children with Stack component and apply padding */}
      <Stack className="p-4">{children}</Stack>
    </>
  );
};

export default MainPageLayout;
