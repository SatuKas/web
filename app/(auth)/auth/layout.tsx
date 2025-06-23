import AuthLayout from '@/components/layout/AuthLayout';
import { DEFAULT_AUTH_IMAGE } from '@/constants/auth';

export default async function RootAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout image={DEFAULT_AUTH_IMAGE}>{children}</AuthLayout>;
}
