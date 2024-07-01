import Logo from '@/assets/icons/Logo';
import AuthButton from '../components/AuthButton';
import AnonymousFileUpload from '@/components/AnonymousFileUpload';
import ThemeDropdown from '@/components/ThemeDropdown';

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-5">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <AnonymousFileUpload />
      </div>
    </div>
  );
}

//<div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
