import Logo from "@/assets/icons/Logo";
import AuthButton from "./AuthButton";

const Header = () => {
  return (
    <div className="w-full">
      <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <div>
            <Logo />
          </div>
          <AuthButton />
        </div>
      </nav>
    </div>
  );
};

export default Header;
