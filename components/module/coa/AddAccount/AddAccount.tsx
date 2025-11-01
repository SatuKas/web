import Button from '@/components/ui/Button';
import useBookDetail from '@/hooks/common/useBookDetail';
import useDialog from '@/hooks/common/useDialog';
import { AccountListData } from '@/types/client/coa';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AddAccountForm from './AddAccountForm';

interface AddAccountProps {
  onSuccess?: () => void;
  accountList?: AccountListData[];
}

const AddAccount = ({ onSuccess, accountList }: AddAccountProps) => {
  const t = useTranslations('coa');
  const { openDialog } = useDialog();
  const { bookId } = useBookDetail();

  const handleAddAccount = () => {
    openDialog({
      title: t('createAccount.title'),
      description: t('createAccount.description'),
      children: <AddAccountForm onSuccess={onSuccess} accountList={accountList} bookId={bookId} />,
    });
  };

  return (
    <Button onClick={handleAddAccount}>
      <PlusIcon /> {t('button.addAccount')}
    </Button>
  );
};

export default AddAccount;
