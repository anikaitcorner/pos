export type HttpStatusCode = 200 | 201 | 203 | 404 | 401 | 403 | 500;

export interface IApiError {
  message: string;
  statusCode: HttpStatusCode | number;
}

export interface IApiResponse<T> {
  data?: T extends IApiError ? never : T;
  error?: T extends IApiError ? T : never;
}
