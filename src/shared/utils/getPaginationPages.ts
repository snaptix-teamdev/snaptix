export const getPaginationPages = (currentPage: number, pagesCount: number): (number | '...')[] => {
  const SIBLING_COUNT = 1

  const leftSibling = Math.max(2, currentPage - SIBLING_COUNT)
  const rightSibling = Math.min(pagesCount - 1, currentPage + SIBLING_COUNT)

  const showLeftDots = leftSibling > 3
  const showRightDots = rightSibling < pagesCount - 2

  // Мало страниц — показываем все без троеточий
  if (!showLeftDots && !showRightDots) {
    return Array.from({ length: pagesCount }, (_, i) => i + 1)
  }

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 5 }, (_, i) => i + 1)
    return [...leftRange, '...', pagesCount]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from({ length: 5 }, (_, i) => pagesCount - 4 + i)
    return [1, '...', ...rightRange]
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pagesCount]
}
