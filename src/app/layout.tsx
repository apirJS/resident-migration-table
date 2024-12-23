import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// import { SidebarProvider } from '@/components/ui/sidebar';
// import AppSidebar from '@/components/app-sidebar';
import ThemeProvider from '@/components/themeProvider';
import Header from '@/components/ui/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tabel Migrasi Data Penduduk',
  description: 'Tabel Migrasi Data Penduduk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {/* <SidebarProvider defaultOpen={false}> */}
            {/* <AppSidebar /> */}
            <Header />
            {children}
          {/* </SidebarProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
