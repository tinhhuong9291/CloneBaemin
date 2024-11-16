/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';
import toast from 'react-hot-toast';
import { UseFormSetError } from 'react-hook-form';
import { EntityError } from '@/libs/http';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};

export const handleErrorApi = ({
  error,
  setError,
}: {
  error: any;
  setError?: UseFormSetError<any>;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message,
      });
    });
  } else {
    toast.error(error?.payload?.message ?? 'Error');
  }
};

const isBrowser = typeof window !== 'undefined';
export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('access_token') : null;

export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('refresh_token') : null;
