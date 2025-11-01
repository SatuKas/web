import Button from '@/components/ui/Button';
import useBookDetail from '@/hooks/common/useBookDetail';
import useDialog from '@/hooks/common/useDialog';
import { AccountListData } from '@/types/client/coa';
import { PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import EditAccountForm from './EditAccountForm';

interface EditAccountProps {
  onSuccess?: () => void;
  accountData: AccountListData;
}

const EditAccount = ({ onSuccess, accountData }: EditAccountProps) => {
  const t = useTranslations('coa');
  const { openDialog } = useDialog();
  const { bookId } = useBookDetail();

  const handleEditAccount = () => {
    openDialog({
      title: t('editAccount.title'),
      description: t('editAccount.description'),
      children: <EditAccountForm onSuccess={onSuccess} accountData={accountData} bookId={bookId} />,
    });
  };

  return (
    <Button onClick={handleEditAccount} variant="outline" size="sm">
      <PencilIcon /> {t('button.editAccount')}
    </Button>
  );
};

export default EditAccount;
