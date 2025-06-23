import DashboardLayout from '@/components/layout/DashboardLayout';

export default async function RootAuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
