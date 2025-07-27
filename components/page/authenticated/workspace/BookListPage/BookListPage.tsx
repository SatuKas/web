import BookList from '@/components/module/dashboardWorkSpace/books/BookList';
import CreateBook from '@/components/module/dashboardWorkSpace/books/CreateBook';
import Container from '@/components/ui/Container';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { BookListProvider } from '@/contexts/BookListContext/BookListContext';
import { useTranslations } from 'next-intl';

const BookListPage = () => {
  const t = useTranslations();

  return (
    <BookListProvider>
      <Stack className="w-full min-h-full flex-1">
        <Stack direction="row" className="py-8 md:py-10 border-b" align="center">
          <Container>
            <Stack direction="row" align="center" justify="between" gap={3}>
              <Typography variant="h2">{t('dashboardWorkspace.bookList.title')}</Typography>
              <CreateBook />
            </Stack>
          </Container>
        </Stack>
        <BookList />
      </Stack>
    </BookListProvider>
  );
};

export default BookListPage;
