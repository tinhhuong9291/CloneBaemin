'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterBody, RegisterBodyType } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserRoundPlus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';
import envConfig from '@/config/envConfig';

export default function SignUpForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    setLoading(true);
    try {
      const res = await axios.post(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
        values,
      );
      toast.success(res.data.message);
      router.push('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] flex-shrink-0 space-y-4"
          noValidate
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Van A"
                      {...field}
                      className={
                        'w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-5 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nguyen"
                      {...field}
                      className={
                        'w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-5 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@gmail.com"
                    type="email"
                    {...field}
                    className={
                      'w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-5 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0900999000"
                    type="text"
                    {...field}
                    className={
                      'w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-5 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className={
                      'w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-5 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="!mt-8 w-full rounded-md bg-primary py-3 text-base hover:bg-primary/80"
          >
            {loading ? (
              <>Loading</>
            ) : (
              <>
                {' '}
                Đăng ký
                <UserRoundPlus size={25} strokeWidth={2.6} />
              </>
            )}
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
