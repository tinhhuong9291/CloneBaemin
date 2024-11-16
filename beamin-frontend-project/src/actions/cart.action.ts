import http from '@/libs/http';

type AddCartBodyType = {
  quantity: number;
};

export const cartActions = {
  getAll: (access_token: string) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    http.get<any>('/carts', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),
  add: (access_token: string, body: AddCartBodyType, food_id: number) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    http.post<any>(`/carts/${food_id}`, body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToOrder: (access_token: string, body: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    http.post<any>(`/orders`, body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),
};
