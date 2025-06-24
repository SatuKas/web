import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';

export default async function RootAuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
