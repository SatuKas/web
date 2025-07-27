'use client';

import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Stack from '@/components/ui/Stack';
import Tooltip from '@/components/ui/Tooltip';
import Typography from '@/components/ui/Typography';
import { DATE_FORMAT } from '@/constants/date';
import { BOOK_DASHBOARD_PATH_URL } from '@/constants/routes';
import useAlertDialog from '@/hooks/common/useAlertDialog';
import useBookMutation from '@/hooks/module/book/query/useBookMutation';
import useBook from '@/hooks/module/book/useBook';
import dayjs from '@/libs/dayjs';
import { replaceString } from '@/utils/string';
import { Notebook, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface BookCardProps {
  id: string;
  title: string;
  description?: string;
  owner: string;
  ownerUsername: string;
  createdAt: string;
  canDelete?: boolean;
}

const BookCard = ({ id, title, description, owner, ownerUsername, createdAt, canDelete = false }: BookCardProps) => {
  const t = useTranslations();

  const { deleteBook, isLoadingDeleteBook } = useBookMutation();
  const { closeAlertDialog, openAlertDialog } = useAlertDialog();
  const { refetchBookList } = useBook();

  const handleDeleteBook = async () => {
    deleteBook(id, {
      onSuccess: () => {
        refetchBookList();
        if (!isLoadingDeleteBook) {
          closeAlertDialog();
        }
      },
    });
  };

  const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    openAlertDialog({
      title: t('dashboardWorkspace.bookList.deleteBook.title'),
      description: t('dashboardWorkspace.bookList.deleteBook.description'),
      action: {
        confirm: {
          label: t('dashboardWorkspace.bookList.deleteBook.confirm'),
          onClick: handleDeleteBook,
          props: {
            variant: 'destructive',
          },
        },
        cancel: {
          label: t('common.cancel'),
          onClick: closeAlertDialog,
        },
      },
    });
  };

  return (
    <Link href={replaceString(BOOK_DASHBOARD_PATH_URL, { ':username': ownerUsername, ':bookId': id })}>
      <Card key={title} className="p-6 hover:shadow-lg transition-all duration-300 hover:cursor-pointer h-60">
        <Stack direction="row" gap={2} align="start" justify="between">
          <Box className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Notebook />
          </Box>
          {canDelete && (
            <Tooltip content={t('dashboardWorkspace.bookList.deleteBook.title')}>
              <Button variant="ghost" onClick={handleOpenDialog} className="p-0 w-fit">
                <Trash size={16} className="text-destructive" />
              </Button>
            </Tooltip>
          )}
        </Stack>
        <Stack justify="between" className="h-full flex-1">
          <Stack gap={1}>
            <Typography variant="h3" className="mt-4 text-lg font-semibold">
              {title}
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              {description || '-'}
            </Typography>
          </Stack>
          <Typography variant="muted" textAlign="right" className="italic font-xs">
            {owner} | {dayjs(createdAt).format(DATE_FORMAT)}
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
};

export default BookCard;
