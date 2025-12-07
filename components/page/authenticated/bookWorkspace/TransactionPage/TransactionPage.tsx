import BookWorkspacePageLayout from '@/components/layout/BookWorkspacePageLayout';
import CreateTransactionForm from '@/components/module/transaction/CreateTransactionForm';
import { BookRoutePathType } from '@/types/client/url';
import { breadcrumbHelper } from '@/utils/ui';

const TransactionPage = () => {
  return (
    <BookWorkspacePageLayout breadcrumb={[breadcrumbHelper('menu.transaction', BookRoutePathType.BOOK_TRANSACTION)]}>
      <CreateTransactionForm />
    </BookWorkspacePageLayout>
  );
};

export default TransactionPage;
