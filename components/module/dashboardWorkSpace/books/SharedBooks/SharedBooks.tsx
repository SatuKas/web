'use client';

import EmptyData from '@/components/shared/EmptyData';
import Box from '@/components/ui/Box';
import Skeleton from '@/components/ui/Skeleton';
import { TabsContent } from '@/components/ui/Tabs';
import useBook from '@/hooks/module/book/useBook';
import { useTranslations } from 'next-intl';
import BookCard from '../BookCard';

interface SharedBooksProps {
  value: string;
}

const SharedBooks = ({ value }: SharedBooksProps) => {
  const { bookSharedList, isLoadingBookSharedList } = useBook();
  const t = useTranslations();

  return (
    <TabsContent value={value} className="flex-1 min-h-full">
      <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoadingBookSharedList ? (
          <Skeleton className="h-60 w-full" />
        ) : bookSharedList && bookSharedList.length > 0 ? (
          bookSharedList?.map((book) => (
            <BookCard
              id={book.id}
              key={book.id}
              title={book.name}
              ownerUsername={book.owner.username}
              description={book.description}
              createdAt={book.createdAt}
              owner={book.owner.name}
            />
          ))
        ) : null}
      </Box>
      {!isLoadingBookSharedList && bookSharedList?.length === 0 && (
        <EmptyData
          title={t('emptyData.sharedBookList.title')}
          description={t('emptyData.sharedBookList.description')}
        />
      )}
    </TabsContent>
  );
};

export default SharedBooks;
