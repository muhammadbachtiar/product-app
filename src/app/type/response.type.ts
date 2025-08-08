export type BaseResponseDto<T> = {
  status_code: string;
  is_success: boolean;
  error_code: string;
  code: number;
  data: T;
};

export type BaseRequestParams = {
  limit?: number;
  page?: number;
  q?: string;
};

export type BaseResponsePaginate<T> = {
  status_code: string;
  is_success: boolean;
  error_code: string;
  code: number;
  data: T;
  pagination: {
    page: number;
    limit: number; 
    total: number;
    total_pages: number, 
    search: null | string;
  };
};
