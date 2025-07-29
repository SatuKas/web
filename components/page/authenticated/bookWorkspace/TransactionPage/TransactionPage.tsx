import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import ComingSoon from '@/components/shared/ComingSoon';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const TransactionPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.transaction', BookRoutePathType.BOOK_TRANSACTION)]}>
      <ComingSoon />
    </BookWorkspacePageLayout>
  );
};

export default TransactionPage;
