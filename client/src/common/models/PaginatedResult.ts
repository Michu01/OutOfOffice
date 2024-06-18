type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
}

export default PaginatedResult;