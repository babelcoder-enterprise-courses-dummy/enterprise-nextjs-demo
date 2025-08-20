export interface Paging {
  limit: number;
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalItems: number;
}
