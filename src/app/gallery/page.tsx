import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import FileUpload from './fileUpload';
import Gallery from './gallery';

export default async function GalleryPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="w-full">
        <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
          <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
            <div>LOGO</div>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
        <FileUpload userName={user.email || 'public'} />
        <Gallery userID={user.id} />
      </div>

      <footer className="border-t-foreground/10 flex w-full justify-center border-t p-8 text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
