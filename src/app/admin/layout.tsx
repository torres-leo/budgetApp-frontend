import { verifySession } from '@/auth/dal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ToastNotify from '@/components/ui/ToastNotify';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  return (
    <>
      <Header user={user} />

      <main className='max-w-7xl mx-auto p-3 w-full'>{children}</main>

      <ToastNotify />

      <Footer />
    </>
  );
}
