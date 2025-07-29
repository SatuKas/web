'use client';

import Breadcrumb from '@/components/ui/Breadcrumb';
import useBookDashboardRoute from '@/hooks/common/useBookDashboardRoute';
import { MenuTranslationKeys } from '@/types/client/ui';
import { BookRoutePathType } from '@/types/client/url';

export interface BookWorkspaceBreadcrumbItem {
  title: MenuTranslationKeys;
  path?: BookRoutePathType;
}

interface BookWorkspaceBreadcrumbProps {
  items: BookWorkspaceBreadcrumbItem[];
}

const BookWorkspaceBreadcrumb = ({ items }: BookWorkspaceBreadcrumbProps) => {
  const route = useBookDashboardRoute();

  const breadcrumb = items.map((item) => {
    return {
      title: item.title,
      url: item.path ? route[item.path] : undefined,
    };
  });

  return <Breadcrumb items={breadcrumb} />;
};

export default BookWorkspaceBreadcrumb;
