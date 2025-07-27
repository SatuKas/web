'use client';

import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import useDialog from '@/hooks/common/useDialog';
import useBook from '@/hooks/module/book/useBook';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CreateBookForm from './CreateBookForm';

const CreateBook = () => {
  const t = useTranslations();

  const { openDialog } = useDialog();
  const { refetchBookList } = useBook();

  const handleCreateBook = () => {
    openDialog({
      title: t('dashboardWorkspace.bookList.createBook.title'),
      description: t('dashboardWorkspace.bookList.createBook.description'),
      children: <CreateBookForm refetchBookList={refetchBookList} />,
    });
  };
  return (
    <Stack direction="row" gap={2}>
      <Button onClick={handleCreateBook}>
        <Plus /> {t('dashboardWorkspace.bookList.createBook.button')}
      </Button>
    </Stack>
  );
};

export default CreateBook;
