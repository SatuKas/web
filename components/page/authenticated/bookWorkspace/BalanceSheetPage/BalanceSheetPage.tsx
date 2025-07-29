import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import ComingSoon from '@/components/shared/ComingSoon';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const BalanceSheetPage = () => {
  return (
    <BookWorkspacePageLayout
      breadcrumb={[breadcrumbHelper('menu.balanceSheet', BookRoutePathType.BOOK_REPORT_BALANCE_SHEET)]}
    >
      <ComingSoon />
    </BookWorkspacePageLayout>
  );
};

export default BalanceSheetPage;
