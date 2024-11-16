export type ValidationErrorResponse = {
  field: string;
  constraints: string | string[];
};

export type ErrorResponseObj = {
  statusCode: number;
  message: string;
  errors?: ValidationErrorResponse[];
  data: string | object;
  dateTime: string;
  messageConstants: string | null;
};
