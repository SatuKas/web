import { BOOK_DASHBOARD_PATH_URL } from '@/constants/routes';
import { replaceString } from '@/utils/string';
import { redirect } from 'next/navigation';

const BookIdPageRoute = async ({ params }: { params: Promise<{ username: string; bookId: string }> }) => {
  const { username, bookId } = await params;
  redirect(replaceString(BOOK_DASHBOARD_PATH_URL, { ':username': username, ':bookId': bookId }));
};

export default BookIdPageRoute;
