import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import ComingSoon from '@/components/shared/ComingSoon';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const LedgerPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.ledger', BookRoutePathType.BOOK_REPORT_LEDGER)]}>
      <ComingSoon />
    </BookWorkspacePageLayout>
  );
};

export default LedgerPage;
