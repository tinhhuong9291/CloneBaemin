import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-7">
        <li className="inline-block font-bold duration-300 hover:text-primary">
          <Link href="/">
            Home
            <ChevronRight
              size={16}
              strokeWidth={1.4}
              className="inline-block"
            />
          </Link>
        </li>
        <li className="inline-block font-bold duration-300 hover:text-primary">
          Categories
          <ChevronRight size={16} strokeWidth={1.4} className="inline-block" />
        </li>
        <li className="inline-block font-bold duration-300 hover:text-primary">
          <Link href="/products?sortOrder=asc&sortField=created_at&limit=3&page=1">
            Products
            <ChevronRight
              size={16}
              strokeWidth={1.4}
              className="inline-block"
            />
          </Link>
        </li>
        <li className="inline-block font-bold duration-300 hover:text-primary">
          Blog
          <ChevronRight size={16} strokeWidth={1.4} className="inline-block" />
        </li>
        <li className="inline-block font-bold duration-300 hover:text-primary">
          Contacts
          <ChevronRight size={16} strokeWidth={1.4} className="inline-block" />
        </li>
        <li className="inline-block font-bold duration-300 hover:text-primary">
          Pages
          <ChevronRight size={16} strokeWidth={1.4} className="inline-block" />
        </li>
        <li className="inline-block font-bold duration-300 hover:text-primary">
          Multipage
          <ChevronRight size={16} strokeWidth={1.4} className="inline-block" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
