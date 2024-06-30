import Logo from '@/assets/icons/Logo';
import AuthButton from '../components/AuthButton';
import AnonymousFileUpload from '@/components/AnonymousFileUpload';

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div><Logo/></div>
          <AuthButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <AnonymousFileUpload />
      </div>
    </div>
  );
}
