import DashboardWorkspaceLayout from '@/components/layout/DashboardWorkspaceLayout';

export default async function RootSettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWorkspaceLayout>{children}</DashboardWorkspaceLayout>;
}
