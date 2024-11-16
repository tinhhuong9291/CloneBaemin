import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import type { Metadata } from 'next';
import AppProvider from '@/components/AppProvider';
type RootLayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exclusive',
  description: 'A e-commerce website',
};
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
