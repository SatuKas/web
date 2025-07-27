'use client';

import EmptyData from '@/components/shared/EmptyData';
import Box from '@/components/ui/Box';
import Skeleton from '@/components/ui/Skeleton';
import { TabsContent } from '@/components/ui/Tabs';
import useBook from '@/hooks/module/book/useBook';
import { useTranslations } from 'next-intl';
import BookCard from '../BookCard';

interface MyBooksProps {
  value: string;
}

const MyBooks = ({ value }: MyBooksProps) => {
  const { bookList, isLoadingBookList } = useBook();
  const t = useTranslations();

  return (
    <TabsContent value={value} className="flex-1 min-h-full">
      <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoadingBookList ? (
          <Skeleton className="h-60 w-full" />
        ) : bookList && bookList.length > 0 ? (
          bookList?.map((book) => (
            <BookCard
              id={book.id}
              key={book.id}
              title={book.name}
              ownerUsername={book.owner.username}
              description={book.description}
              createdAt={book.createdAt}
              owner={book.owner.name}
              canDelete
            />
          ))
        ) : null}
      </Box>
      {!isLoadingBookList && bookList?.length === 0 && (
        <EmptyData title={t('emptyData.bookList.title')} description={t('emptyData.bookList.description')} />
      )}
    </TabsContent>
  );
};

export default MyBooks;
