import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Nav } from '@/components/layout/Nav';
import { TasksProvider } from '@/components/providers/TasksProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: 'みんなのタスク管理',
    template: '%s | みんなのタスク管理'
  },
  description: 'シンプルで使いやすいタスク管理アプリです。'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TasksProvider>
            <div className='min-h-screen text-foreground'>
              <header>
                <Header />
                <Nav />
              </header>
              <main className='mx-auto w-full max-w-6xl px-6 py-8'>
                {children}
              </main>
            </div>
            <Toaster />
          </TasksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
