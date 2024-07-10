import Logo from '@/assets/icons/Logo';
import { ThemeSelect } from '@/components/changeTheme/ThemeSelect';
import AuthButton from '@/components/AuthButton';

export default function Header() {
  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="container relative flex w-full items-center justify-between py-3 text-sm">
        <ThemeSelect />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo />
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
