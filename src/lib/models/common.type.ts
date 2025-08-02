export interface IFormState {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: unknown;
}

export interface IAudit {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface IAPIResponse<T> {
  data: T;
  success: boolean;
  code: number;
}

export interface IPaginationResponse<T> extends IAPIResponse<T> {
  page: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
}

export interface IPaginationRequest extends URLSearchParams {
  pageIndex: number | 1;
  pageSize: number | 10;
  keyword: string | "";
}

export const ANONYMOUS = "anonymous";
