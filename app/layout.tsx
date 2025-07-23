import AppProvider from '@/components/hoc/AppProvider';
import { APP_DESCRIPTION, APP_IMAGE_META, APP_LOGO, APP_NAME } from '@/config/app';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const appTitle = `${APP_NAME} | ${APP_DESCRIPTION}`;

export const metadata: Metadata = {
  title: appTitle,
  description: APP_DESCRIPTION,
  icons: {
    icon: APP_LOGO.icon.square,
  },
  openGraph: {
    title: appTitle,
    description: APP_DESCRIPTION,
    images: [APP_IMAGE_META],
  },
  twitter: {
    card: 'summary_large_image',
    title: appTitle,
    description: APP_DESCRIPTION,
    images: [APP_IMAGE_META],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
