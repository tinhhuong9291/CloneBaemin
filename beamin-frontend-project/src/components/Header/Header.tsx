import Navbar from '@/components/Navbar';
import { Logo } from '../Icons';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-[100px] items-center justify-between border-b bg-card">
      <div className="mx-auto flex w-[1200px] items-center justify-between">
        <div>
          <Logo />
        </div>
        <div className="nav">
          <Navbar />
        </div>
        <div className="btn">
          <button
            type="button"
            className="rounded-full border-none bg-secondary px-12 py-3 font-bold text-primary-foreground"
          >
            Get Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
