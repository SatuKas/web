'use client';

import Box from '@/components/ui/Box';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import useIsMobile from '@/hooks/common/useIsMobile';
import { Notebook, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MyBooks from '../MyBooks';
import SharedBooks from '../SharedBooks';

enum BookListTab {
  MY_BOOKS = 'my-books',
  SHARED_BOOKS = 'shared-books',
}

const BookList = () => {
  const t = useTranslations();
  const isMobile = useIsMobile();

  return (
    <Container className="py-8 md:py-10 flex-1">
      <Tabs defaultValue={BookListTab.MY_BOOKS} className="flex-1 min-h-full">
        <Stack align="center" className="flex-col md:flex-row items-start md:items-center" gap={3}>
          <Input
            name="search"
            placeholder={t('dashboardWorkspace.bookList.placeholder.searchBook')}
            fullWidth={isMobile}
          />
          <TabsList>
            <TabsTrigger value={BookListTab.MY_BOOKS}>
              <Notebook /> {t('dashboardWorkspace.bookList.tab.myBooks')}
            </TabsTrigger>
            <TabsTrigger value={BookListTab.SHARED_BOOKS}>
              <Users /> {t('dashboardWorkspace.bookList.tab.sharedBooks')}
            </TabsTrigger>
          </TabsList>
        </Stack>
        <Box className="mt-8 flex flex-1 min-h-full">
          <MyBooks value={BookListTab.MY_BOOKS} />
          <SharedBooks value={BookListTab.SHARED_BOOKS} />
        </Box>
      </Tabs>
    </Container>
  );
};

export default BookList;
