import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="py-8 text-center">
        <Link
          href="#"
          className="mb-5 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src={'/svg/baemin-logo.svg'}
            alt="logo"
            height={150}
            width={150}
            className="mr-3 h-6 sm:h-9"
          />
        </Link>
        <div>
          <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
            © 2021-2022 ™. All Rights Reserved.
          </span>
          <ul className="mt-5 flex justify-center space-x-5">
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Facebook />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Instagram />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Twitter />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Youtube />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
