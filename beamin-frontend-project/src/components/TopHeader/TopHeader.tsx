'use client';
import {
  MapPin,
  PhoneCall,
  Mail,
  Search,
  UserRound,
  ShoppingCart,
} from 'lucide-react';
import Badge from '@/components/Badge';
import { decodeJWT, getAccessTokenFromLocalStorage } from '@/libs/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TopHeader = () => {
  const [isAuth, setIsAuth] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const access_token = getAccessTokenFromLocalStorage();
    setIsAuth(Boolean(access_token));
    if (access_token) setUser(decodeJWT(access_token));
  }, []);

  return (
    <div className="flex justify-between border-b pt-1">
      <div className="mx-auto flex h-9 w-[1200px] items-center justify-between">
        {/* Address, Phone number, Email */}
        <div className="flex gap-5">
          <div className="flex">
            <span className="text-primary">
              <MapPin size={20} className="mr-2" />
            </span>
            <span className="text-sm">
              900 Lucerne Terrace, Orlando, FL 32806
            </span>
          </div>
          <div className="flex">
            <span className="text-primary">
              <PhoneCall size={20} className="mr-2" />
            </span>
            <span className="text-sm font-semibold">+49260-5731-08</span>
          </div>
          <div className="flex">
            <span className="text-primary">
              <Mail size={20} className="mr-2" />
            </span>
            <span className="text-sm">support@fitmeal.us</span>
          </div>
        </div>

        {/* Buttons: Search, User, Cart (auth)*/}
        {isAuth ? (
          <div className="flex gap-7">
            <span>
              Hello, <strong>{user?.email.split('@')[0]}</strong>
            </span>
            <button className="duration-500 hover:text-primary">
              <Search strokeWidth={1.5} />
            </button>
            <button className="duration-500 hover:text-primary">
              <UserRound strokeWidth={1.5} />
            </button>
            <Link
              href={'/cart'}
              className="relative flex items-center duration-500 hover:text-primary"
            >
              <ShoppingCart strokeWidth={1.5} />
              <Badge>0</Badge>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/login" className="font-bold hover:text-primary">
              Login
            </Link>
          </div>
        )}
        {/* Buttons: Login / SignUp (no-auth) */}
      </div>
    </div>
  );
};

export default TopHeader;
