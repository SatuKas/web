import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import LedgerDataTable from '@/components/module/ledger/LedgerDataTable';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const LedgerPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.ledger', BookRoutePathType.BOOK_REPORT_LEDGER)]}>
      <LedgerDataTable />
    </BookWorkspacePageLayout>
  );
};

export default LedgerPage;
