import { ReactNode } from 'react';
import MainPageLayout from '../MainPageLayout';
import BookWorkspaceBreadcrumb, { BookWorkspaceBreadcrumbItem } from './Breadcrumb/Breadcrumb';

/**
 * Props for BookWorkspacePageLayout component
 */
interface BookWorkspacePageLayoutProps {
  children: ReactNode; // Content to be rendered inside the layout
  breadcrumb: BookWorkspaceBreadcrumbItem[];
}

/**
 * BookWorkspacePageLayout is a layout component that wraps the main content of a page.
 * It displays a SiteHeader with breadcrumb navigation and wraps the children with padding using Stack.
 *
 * @param {BookWorkspacePageLayoutProps} props - Props containing children and breadcrumb
 */
const BookWorkspacePageLayout = ({ children, breadcrumb }: BookWorkspacePageLayoutProps) => {
  return (
    <MainPageLayout breadcrumbComponent={<BookWorkspaceBreadcrumb items={breadcrumb} />}>{children}</MainPageLayout>
  );
};

export default BookWorkspacePageLayout;
