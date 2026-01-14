import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minma Task Dashboard",
  description: "Frontend task management assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <header className="border-b">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                  MT
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Minma Task Dashboard
                  </p>
                  <p className="text-lg font-semibold">App Skeleton</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Header placeholder
              </div>
            </div>
            <nav className="border-t">
              <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-3 text-sm font-medium">
                <Link
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  href="/"
                >
                  Dashboard
                </Link>
                <Link
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  href="/tasks"
                >
                  Task Management
                </Link>
                <Link
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  href="/list"
                >
                  Task List
                </Link>
              </div>
            </nav>
          </header>
          <main className="mx-auto w-full max-w-6xl px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
