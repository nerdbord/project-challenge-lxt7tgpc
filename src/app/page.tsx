import Logo from '@/assets/icons/Logo';
import { ThemeSelect } from '@/components/changeTheme/ThemeSelect';
import AuthButton from '../components/AuthButton';
import AnonymousFileUpload from '@/components/AnonymousFileUpload';

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-5">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <ThemeSelect />
          <Logo />
          <AuthButton />
        </div>
      </nav>
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <AnonymousFileUpload />
      </div>
    </div>
  );
}
