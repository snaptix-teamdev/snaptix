'use client'

import { useState } from 'react'
import s from './Payments.module.css'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

interface Payment {
  dateOfPayment: string
  endDate: string
  price: string
  subscriptionType: string
  paymentType: string
}

// Моковые данные (40 записей для теста пагинации)
const generateMockData = (): Payment[] => {
  const types = ['Stripe', 'PayPal']
  const subscriptions = ['1 day', '7 days', '1 month', '3 months', '1 year']
  const prices = ['$10', '$25', '$50', '$75', '$100', '$150', '$200']

  const data: Payment[] = []
  for (let i = 1; i <= 90; i++) {
    data.push({
      dateOfPayment: '12.12.2022',
      endDate: '12.12.2022',
      price: prices[i % prices.length],
      subscriptionType: subscriptions[i % subscriptions.length],
      paymentType: types[i % types.length],
    })
  }
  return data
}

const paymentsData = generateMockData()

export const Payments = () => {
  const dict = useTranslations()

  // Состояния для пагинации
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Вычисляем общее количество страниц
  const pagesCount = Math.ceil(paymentsData.length / pageSize)

  // Получаем данные для текущей страницы
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPayments = paymentsData.slice(startIndex, endIndex)

  // Обработчик изменения размера страницы
  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // Сбрасываем на первую страницу
  }

  return (
    <div className={s.container}>
      <div className={s.table}>
        <div className={s.tableHeader}>
          <div>{dict.settings.dateOfPayment}</div>
          <div>{dict.settings.endDateOfSubscription}</div>
          <div>{dict.settings.price}</div>
          <div>{dict.settings.subscriptionType}</div>
          <div>{dict.settings.paymentType}</div>
        </div>

        <div className={s.tableBody}>
          {currentPayments.map((payment, index) => {
            return (
              <div key={`${startIndex + index}`} className={s.paymentRow}>
                <div className={s.dateCell}>
                  <span>{payment.dateOfPayment}</span>
                </div>

                <div className={s.endDateCell}>
                  <span>{payment.endDate}</span>
                </div>

                <div className={s.priceCell}>
                  <span>{payment.price}</span>
                </div>

                <div className={s.subscriptionCell}>
                  <span>{payment.subscriptionType}</span>
                </div>

                <div className={s.paymentTypeCell}>
                  <span>{payment.paymentType}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={s.pagination}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagesCount={pagesCount}
          pageSize={pageSize}
          changePageSize={changePageSize}
        />
      </div>
    </div>
  )
}
