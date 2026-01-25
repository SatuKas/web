import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import JournalDataTable from '@/components/module/journal/JournalDataTable';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const JournalPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.journal', BookRoutePathType.BOOK_REPORT_JOURNAL)]}>
      <JournalDataTable />
    </BookWorkspacePageLayout>
  );
};

export default JournalPage;
