import Button from '@/components/ui/Button';
import Form, { FormField } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import Stack from '@/components/ui/Stack';
import useCreateBookForm from '@/hooks/module/book/useCreateBookForm';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CreateBookFormProps {
  refetchBookList: () => void;
}

const CreateBookForm = ({ refetchBookList }: CreateBookFormProps) => {
  const t = useTranslations();
  const { form, onSubmit, isLoadingCreateBook, onError } = useCreateBookForm({ refetchBookList });

  return (
    <Form
      onSubmit={onSubmit}
      onError={onError}
      // className="p-6 md:p-8 w-full flex items-center justify-center"
      {...form}
    >
      <Stack gap={6} width="full">
        {/* Name input field */}
        {/* TECHDEBT: need to add error message to user */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              type="text"
              placeholder={t('dashboardWorkspace.bookList.createBook.form.placeholder.name')}
              label={t('dashboardWorkspace.bookList.createBook.form.label.name')}
              required
              {...field}
            />
          )}
        />

        {/* Description input field */}
        {/* TECHDEBT: need to add error message to user */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Input
              type="text"
              placeholder={t('dashboardWorkspace.bookList.createBook.form.placeholder.description')}
              label={t('dashboardWorkspace.bookList.createBook.form.label.description')}
              {...field}
            />
          )}
        />
        <Stack justify="end" direction="row">
          <Button type="submit" loading={isLoadingCreateBook} className="w-fit">
            {!isLoadingCreateBook && <Plus />} {t('dashboardWorkspace.bookList.createBook.button')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CreateBookForm;
