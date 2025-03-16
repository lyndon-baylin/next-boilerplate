import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';

import ReactQueryProvider from '@/providers/react-query-provider';

import { geistMono, geistSans } from '@/utils/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description: 'An opinionated boilerplate for NextJS project with minimal setup to get started',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" value={{ light: 'light', dark: 'dark' }}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
