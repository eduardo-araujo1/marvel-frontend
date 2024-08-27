export interface ApiResponse<T> {
  content: T[];
  pageable: any;
  page : any;
  size : any;
  totalPages: number;
  totalElements: number;
}