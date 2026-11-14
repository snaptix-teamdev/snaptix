import { getPaginationPages } from '@/shared/utils/getPaginationPages'
import s from './Pagination.module.css'
import type { PaginationProps } from './Pagination.types'
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/svg/Icon'

export const Pagination = ({ currentPage, setCurrentPage, pagesCount, pageSize, changePageSize }: PaginationProps) => {
  if (pagesCount <= 1) {
    return null
  }

  const pages = getPaginationPages(currentPage, pagesCount)

  const onNext = () => setCurrentPage(currentPage + 1)
  const onPrevious = () => setCurrentPage(currentPage - 1)

  return (
    <section className={s.container}>
      <div className={s.pagination}>
        <button className={s.arrowButton} onClick={onPrevious} disabled={currentPage === 1} type={'button'}>
          <ArrowLeftIcon width={16} height={16} />
        </button>
        {pages.map((page, id) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${id}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
              onClick={() => page !== currentPage && setCurrentPage(Number(page))}
              disabled={page === currentPage}
              type={'button'}
            >
              {page}
            </button>
          ),
        )}
        <button className={s.arrowButton} onClick={onNext} disabled={currentPage === pagesCount} type="button">
          <ArrowRightIcon width={16} height={16} />
        </button>
      </div>
      <label>
        Show
        <select className={s.select} value={pageSize} onChange={(e) => changePageSize(Number(e.target.value))}>
          {[10, 20, 30, 50, 100].map((size) => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </select>
        on page
      </label>
    </section>
  )
}
