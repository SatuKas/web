import DashboardLayout from '@/components/layout/DashboardLayout';

export default async function RootWorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
