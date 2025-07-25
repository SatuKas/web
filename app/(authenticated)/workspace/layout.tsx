import DashboardWorkspaceLayout from '@/components/layout/DashboardWorkspaceLayout';

export default async function RootWorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWorkspaceLayout>{children}</DashboardWorkspaceLayout>;
}
