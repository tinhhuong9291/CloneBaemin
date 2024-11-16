import http from '@/libs/http';
import type { LoginBodyType, LoginResType } from '@/schemas/auth.schema';

const authAction = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseUrl: '',
    }),
};

export default authAction;
