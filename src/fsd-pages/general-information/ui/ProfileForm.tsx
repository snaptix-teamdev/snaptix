'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Button } from '@/shared/ui/button/Button'
import { Input } from '@/shared/ui/input/Input'
import { DatePicker } from '@/shared/ui/date-picker/DatePicker'
import s from './ProfileForm.module.css'
import { useMeQuery } from '@/shared/api/auth'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

interface IProfileForm {
  username: string
  firstName: string
  lastName: string
  dateOfBirth: Date | undefined
  country: string
  city: string
  aboutMe: string
}

const defaultValues = {
  username: '',
  firstName: '',
  lastName: '',
  dateOfBirth: undefined,
  country: '',
  city: '',
  aboutMe: '',
}

export default function ProfileForm() {
  const { data: me } = useMeQuery()
  const dict = useTranslations()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IProfileForm>({
    defaultValues: defaultValues,
    values: me
      ? {
          ...defaultValues,
          username: me.username || '',
        }
      : undefined,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const validateAge = (date: Date | undefined) => {
    if (!date) return true
    const today = new Date()
    const birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 13) {
      return dict.profileForm.ageValidation
    }
    return true
  }

  const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
    console.log(data)
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
      alert(dict.profileForm.settingsSaved)
    } catch (error) {
      alert(dict.profileForm.serverNotAvailable)
      return console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.formGroup}>
        <Input
          id="username"
          label={
            <>
              {dict.profileForm.username}
              <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
            </>
          }
          {...register('username', {
            required: dict.profileForm.usernameRequired,
            minLength: { value: 6, message: dict.profileForm.usernameMinLength },
            maxLength: { value: 30, message: dict.profileForm.usernameMaxLength },
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: dict.profileForm.usernamePattern,
            },
          })}
        />
      </div>

      <div className={s.formGroup}>
        <Input
          id="firstName"
          label={
            <>
              {dict.profileForm.firstName}
              <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
            </>
          }
          {...register('firstName', {
            required: dict.profileForm.firstNameRequired,
            maxLength: { value: 50, message: dict.profileForm.firstNameMaxLength },
            pattern: {
              value: /^[a-zA-Za-яА-ЯёЁ]+$/,
              message: dict.profileForm.firstNamePattern,
            },
          })}
          error={errors.firstName?.message}
        />
      </div>

      <div className={s.formGroup}>
        <Input
          id="lastName"
          label={
            <>
              {dict.profileForm.lastName}
              <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
            </>
          }
          {...register('lastName', {
            required: dict.profileForm.lastNameRequired,
            maxLength: { value: 50, message: dict.profileForm.lastNameMaxLength },
            pattern: {
              value: /^[a-zA-Za-яА-ЯёЁ]+$/,
              message: dict.profileForm.lastNamePattern,
            },
          })}
          error={errors.lastName?.message}
        />
      </div>

      <div className={s.formGroup}>
        <p className={s.date}>{dict.profileForm.dateOfBirth}</p>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ validate: validateAge }}
          render={({ field, fieldState: { error } }) => {
            return (
              <div>
                <DatePicker
                  mode="single"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  errorText={undefined}
                  locale="en"
                  disabled={false}
                />
                {error?.message && (
                  <div
                    className={s.errorMessage}
                    dangerouslySetInnerHTML={{
                      __html: error.message
                        .replace(
                          'Privacy Policy',
                          '<a href="/privacy-policy" style="text-decoration: underline; color: #4C8DFF; font-weight: 500;">Privacy Policy</a>',
                        )
                        .replace(
                          'Политика конфиденциальности',
                          '<a href="/privacy-policy" style="text-decoration: underline; color: #4C8DFF; font-weight: 500;">Политика конфиденциальности</a>',
                        ),
                    }}
                  />
                )}
              </div>
            )
          }}
        />
      </div>

      <div className={s.row}>
        <div className={s.rowItem}>
          <label className={s.label}>{dict.profileForm.selectYourCountry}</label>
          <select
            id="country"
            {...register('country', { required: dict.profileForm.countryRequired })}
            className={`${s.select} ${errors.country ? s.selectError : ''}`}
          >
            <option value="">{dict.profileForm.country}</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="japan">Japan</option>
            <option value="australia">Australia</option>
          </select>
          {errors.country && <span className={s.errorMessage}>{errors.country.message}</span>}
        </div>

        <div className={s.rowItem}>
          <label className={s.label}>{dict.profileForm.selectYourCity}</label>
          <select
            id="city"
            {...register('city', { required: dict.profileForm.cityRequired })}
            className={`${s.select} ${errors.city ? s.selectError : ''}`}
          >
            <option value="">{dict.profileForm.city}</option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
            <option value="houston">Houston</option>
            <option value="phoenix">Phoenix</option>
          </select>
          {errors.city && <span className={s.errorMessage}>{errors.city.message}</span>}
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="aboutMe" className={s.label}>
          {dict.profileForm.aboutMe}
        </label>
        <textarea
          id="aboutMe"
          {...register('aboutMe', {
            maxLength: {
              value: 200,
              message: dict.profileForm.aboutMeMaxLength,
            },
          })}
          rows={4}
          placeholder={dict.profileForm.textArea}
          className={`${s.textarea} ${errors.aboutMe ? s.textareaError : ''}`}
        />
        {errors.aboutMe && <span className={s.errorMessage}>{errors.aboutMe.message}</span>}
      </div>

      <div className={s.buttonWrapper}>
        <Button type="submit" variant="primary" disabled={isSubmitting} width="auto">
          {isSubmitting ? dict.profileForm.saving : dict.profileForm.saveChanges}
        </Button>
      </div>
    </form>
  )
}
