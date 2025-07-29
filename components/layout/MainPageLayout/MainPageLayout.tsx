import { SiteHeader } from '@/components/ui/Sidebar/SiteHeader';
import Stack from '@/components/ui/Stack';
import { ReactNode } from 'react';

/**
 * Props for MainPageLayout component
 */
interface MainPageLayoutProps {
  children: ReactNode; // Content to be rendered inside the layout
  breadcrumbComponent: React.ReactNode; // Breadcrumb component to display in the header
}

/**
 * MainPageLayout is a layout component that wraps the main content of a page.
 * It displays a SiteHeader with breadcrumb navigation and wraps the children with padding using Stack.
 *
 * @param {MainPageLayoutProps} props - Props containing children and breadcrumb
 */
const MainPageLayout = ({ children, breadcrumbComponent }: MainPageLayoutProps) => {
  return (
    <>
      {/* Render the site header with breadcrumb navigation */}
      <SiteHeader breadcrumbComponent={breadcrumbComponent} />
      {/* Wrap children with Stack component and apply padding */}
      <Stack className="p-4">{children}</Stack>
    </>
  );
};

export default MainPageLayout;
