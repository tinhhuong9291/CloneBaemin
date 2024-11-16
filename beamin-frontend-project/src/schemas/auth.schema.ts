import { Role } from '@/constants/type';
import z from 'zod';

export const RegisterBody = z
  .object({
    first_name: z.string().trim().min(2).max(80),
    last_name: z.string().trim().min(2).max(80),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    password: z.string().min(6).max(30),
  })
  .strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    id: z.number(),
    email: z.string(),
    role: z.enum([Role.User, Role.Admin]),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
