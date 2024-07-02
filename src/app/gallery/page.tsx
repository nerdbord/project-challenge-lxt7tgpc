import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import GalleryWrapper from './GalleryWrapper';

export default async function GalleryPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-10">
      <div className="flex max-w-4xl flex-1 flex-col gap-10 px-3">
        <GalleryWrapper/>
      </div>

    </div>
  );
}
