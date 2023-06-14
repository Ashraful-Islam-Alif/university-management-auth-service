import { SortOrder } from 'mongoose';
import { IGenericErrorMessage } from './error';
export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    sortBy: string;
    sortOrder: SortOrder;
  };
  data: T;
};
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
