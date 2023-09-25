export type Response<T> = {
  message: string[] | null;
  error?: string;
  statusCode: number;
  data?: T;
};
