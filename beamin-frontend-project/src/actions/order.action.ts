import http from '@/libs/http';

export const ordersActions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToOrder: (body: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    http.post<any>(`/orders`, body),
};
