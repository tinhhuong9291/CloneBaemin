export type LoginResponseType = {
  statusCode: number;
  message: string;
  data: {
    id: string;
    email: string;
    access_token: string;
    refresh_token: string;
  };
  dateTime: string;
};

export type RegisterResponseType = {
  statusCode: number;
  message: string;
  data: {
    id: string;
    email: string;
    access_token: string;
    refresh_token: string;
  };
  dateTime: string;
};

export type PaginationResponseType<T> = {
  items: T[];
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
};
