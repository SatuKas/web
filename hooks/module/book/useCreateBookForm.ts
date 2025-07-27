import { toast } from '@/components/hoc/ToastProvider';
import { CREATE_BOOK_FORM_DEFAULT_VALUES } from '@/constants/book';
import useDialog from '@/hooks/common/useDialog';
import { CreateBookPayload } from '@/types/api/book';
import { CreateBookData } from '@/types/client/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useBookMutation from './query/useBookMutation';
import useCreateBookSchema from './useCreateBookSchema';

interface UseCreateBookFormProps {
  refetchBookList: () => void;
}

const useCreateBookForm = ({ refetchBookList }: UseCreateBookFormProps) => {
  // Get login schema for form validation
  const { createBookSchema } = useCreateBookSchema();
  const { closeDialog } = useDialog();

  const { createBook, isLoadingCreateBook } = useBookMutation();
  const t = useTranslations();
  // Initialize react-hook-form with zod resolver and default values
  const form = useForm<CreateBookData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: CREATE_BOOK_FORM_DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<CreateBookData> = (data) => {
    const payload: CreateBookPayload = {
      name: data.name,
      description: data.description,
    };
    createBook(payload, {
      onSuccess: () => {
        refetchBookList();
        toast.success(t('dashboardWorkspace.bookList.createBook.form.message.toast.successCreateBook'));
        closeDialog();
      },
    });
  };

  const onError: SubmitErrorHandler<CreateBookData> = (errors) => {
    console.log({ errors });
  };

  return { form, onSubmit, isLoadingCreateBook, onError };
};

export default useCreateBookForm;
