import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import ComingSoon from '@/components/shared/ComingSoon';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const JournalPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.journal', BookRoutePathType.BOOK_REPORT_JOURNAL)]}>
      <ComingSoon />
    </BookWorkspacePageLayout>
  );
};

export default JournalPage;
