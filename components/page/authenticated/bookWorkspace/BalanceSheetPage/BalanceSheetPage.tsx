import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import BalanceSheetDataTable from '@/components/module/balanceSheet/BalanceSheetDataTable';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const BalanceSheetPage = () => {
  return (
    <BookWorkspacePageLayout
      breadcrumb={[breadcrumbHelper('menu.balanceSheet', BookRoutePathType.BOOK_REPORT_BALANCE_SHEET)]}
    >
      <BalanceSheetDataTable />
    </BookWorkspacePageLayout>
  );
};

export default BalanceSheetPage;
