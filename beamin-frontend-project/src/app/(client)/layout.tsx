import type { Metadata } from 'next';
import { Footer, Header, TopHeader } from '@/components';

export const metadata: Metadata = {
  title: 'Exclusive',
  description: 'A e-commerce website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopHeader />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
