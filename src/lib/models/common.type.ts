export interface FormState {
  success: boolean;
  message?: string;
  data?: unknown;
  errors?: unknown;
}

export interface Audit {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  code: number;
}

export interface PaginationResponse<T> extends APIResponse<T> {
  page: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
}

export interface PaginationRequest extends URLSearchParams {
  pageIndex: number | 1;
  pageSize: number | 10;
  keyword: string | "";
}

export const ANONYMOUS = "anonymous";
