import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/changeTheme/ThemeContext';
import { ClientThemeWrapper } from '@/components/changeTheme/ClientThemeWrapper';

const inter = Inter({ subsets: ['latin'] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Gallery',
  description: 'Personal Gallery with public URLs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-none`} data-theme="cupcake">
        <main className="flex min-h-screen w-full flex-col items-center">
          <Toaster position="bottom-right" />
          <ThemeProvider>
            <ClientThemeWrapper>{children}</ClientThemeWrapper>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
