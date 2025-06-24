import { SiteHeader } from '@/components/ui/Sidebar/SiteHeader';
import Stack from '@/components/ui/Stack';
import { BreadcrumbLinkItem } from '@/types/client/ui';
import { ReactNode } from 'react';

interface MainPageLayoutProps {
  children: ReactNode;
  breadcrumb: BreadcrumbLinkItem[];
}

const MainPageLayout = ({ children, breadcrumb }: MainPageLayoutProps) => {
  return (
    <>
      <SiteHeader breadcrumb={breadcrumb} />
      <Stack className="p-4">{children}</Stack>
    </>
  );
};

export default MainPageLayout;
