import DashboardLayout from '@/components/layout/DashboardLayout';
import { APP_SIDEBAR_BOOK_DASHBOARD_MENU } from '@/config/app';
import { BookDetailProvider } from '@/contexts/BookDetailContext/BookDetailContext';
import { BookRouteProvider } from '@/contexts/BookRouteContext';

export default async function RootBookLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ username: string; bookId: string }>;
}>) {
  const { username, bookId } = await params;
  return (
    <BookRouteProvider params={{ username, bookId }}>
      <BookDetailProvider params={{ bookId }}>
        <DashboardLayout menuItems={APP_SIDEBAR_BOOK_DASHBOARD_MENU(username, bookId)}>{children}</DashboardLayout>
      </BookDetailProvider>
    </BookRouteProvider>
  );
}
