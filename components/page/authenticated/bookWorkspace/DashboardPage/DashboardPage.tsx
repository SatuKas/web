import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import ComingSoon from '@/components/shared/ComingSoon';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const DashboardPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.dashboard', BookRoutePathType.BOOK_DASHBOARD)]}>
      <ComingSoon />
    </BookWorkspacePageLayout>
  );
};

export default DashboardPage;
