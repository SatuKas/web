import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import ComingSoon from '@/components/shared/ComingSoon';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const CoaPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.coa', BookRoutePathType.BOOK_COA)]}>
      <ComingSoon />
    </BookWorkspacePageLayout>
  );
};

export default CoaPage;
