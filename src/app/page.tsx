import AnonymousFileUpload from '@/components/AnonymousFileUpload';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/gallery');
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-5">
      <Header />
      <div className="container flex w-full items-center justify-between py-3 text-sm">
        <AnonymousFileUpload />
      </div>
      <Footer />
    </div>
  );
}
