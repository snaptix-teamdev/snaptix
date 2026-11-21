export type PaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesCount: number
  changePageSize: (pageSize: number) => void
  pageSize: number
}
