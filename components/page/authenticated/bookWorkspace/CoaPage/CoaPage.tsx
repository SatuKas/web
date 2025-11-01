import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import CoaDataTable from '@/components/module/coa/CoaDataTable';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const CoaPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.coa', BookRoutePathType.BOOK_COA)]}>
      <CoaDataTable />
    </BookWorkspacePageLayout>
  );
};

export default CoaPage;
