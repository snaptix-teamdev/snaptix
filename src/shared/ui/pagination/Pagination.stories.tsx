import { useArgs } from 'storybook/preview-api'
import { Pagination } from './Pagination'
import type { StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  argTypes: {
    setCurrentPage: { action: 'page-changed' },
    changePageSize: { action: 'size-changed' },
  },
}

export default meta

type Story = StoryObj<typeof Pagination>

export const PaginationInt: Story = {
  args: {
    currentPage: 1,
    pagesCount: 55,
    pageSize: 10,
  },
  render: (args) => {
    const [{ currentPage, pageSize }, updateArgs] = useArgs()

    const handleSetPage = (page: number) => updateArgs({ currentPage: page })

    const handleChangeSize = (size: number) => updateArgs({ pageSize: size, currentPage: 1 })

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        pageSize={pageSize}
        setCurrentPage={handleSetPage}
        changePageSize={handleChangeSize}
      />
    )
  },
}
