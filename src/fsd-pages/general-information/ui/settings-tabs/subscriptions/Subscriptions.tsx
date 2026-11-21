'use client'

import s from './Subscriptions.module.css'
import { useState } from 'react'
import { RadioGroup } from '@/shared/ui/radio-group/RadioGroup'
import Link from 'next/link'
import Image from 'next/image'
import payPal from '@/public/png/payPal.png'
import stripe from '@/public/png/stripe.png'
import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import { getSubscriptionCosts, getTypeSubscription } from '@/fsd-pages/general-information/constants/validParts'

export const Subscriptions = () => {
  const [accountType, setAccountType] = useState('personal')
  const [subscriptionCost, setSubcriptionCost] = useState('personal')
  const [isChecked, setIsChecked] = useState(false)

  const dict = useTranslations()

  const TYPE_SUBSCRIPTION = getTypeSubscription(dict)
  const SUBSCRIPTION_COSTS = getSubscriptionCosts(dict)

  const currentSubscription = false // на будующее

  return (
    <div className={s.tabContent}>
      {currentSubscription && (
        <>
          <h3>{dict.settings.currentSubscription}</h3>
          <div className={s.currentSubscription}>
            <div className={s.currentSubscriptionInfo}>
              <span className={s.currentSubscriptionTitle}>{dict.settings.expireAt}</span>
              <span className={s.currentSubscriptionDate}>12.02.2022</span>
            </div>
            <div className={s.currentSubscriptionInfo}>
              <span className={s.currentSubscriptionTitle}>{dict.settings.nextPayment}</span>
              <span className={s.currentSubscriptionDate}>12.02.2022</span>
            </div>
          </div>
          <div className={s.checkboxWrapper}>
            <Checkbox label={dict.settings.autoRenewal} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          </div>
        </>
      )}

      <h3>{dict.settings.accountType}</h3>
      <div className={s.accountType}>
        <RadioGroup
          options={TYPE_SUBSCRIPTION}
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          name="accountType"
        />
      </div>
      {accountType === 'business' ? (
        <>
          <h3>{dict.settings.yourSubscriptionCosts}</h3>
          <div className={s.subscriptions}>
            <RadioGroup
              options={SUBSCRIPTION_COSTS}
              value={subscriptionCost}
              onChange={(e) => setSubcriptionCost(e.target.value)}
              name="subscriptionCosts"
            />
          </div>
          <div className={s.paymentMethods}>
            <Link href={'#'}>
              <Image
                src={payPal}
                alt={dict.settings.paymentMethodsPayPal}
                width={70}
                height={48}
                className={`${s.paymentMethodsImg} ${s['paymentMethodsImg--small']}`}
              />
            </Link>
            <small>{dict.settings.or}</small>
            <Link href={'#'}>
              <Image
                src={stripe}
                alt={dict.settings.paymentMethodsStripe}
                width={70}
                height={30}
                className={`${s.paymentMethodsImg} ${s['paymentMethodsImg--large']}`}
              />
            </Link>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}
