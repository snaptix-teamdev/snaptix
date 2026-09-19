'use client'

import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form'
import { Button } from '@/shared/ui/button/Button'
import { Input } from '@/shared/ui/input/Input'
import { DatePicker } from '@/shared/ui/date-picker/DatePicker'
import s from './ProfileForm.module.css'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import {
  GEO_CITIES_QUERY_KEY,
  GEO_REGIONS_QUERY_KEY,
  useCitiesQuery,
  useCountriesQuery,
  useRegionsQuery,
} from '../api/hooks/use-geo-items-query'
import { useUpdateProfileSettingsMutation } from '../api/hooks/use-update-profile-mutations'
import type { UpdateProfileSettingsRequestDto } from '../api/dto'
import { useGetProfileSettingsQuery } from '../api/hooks/use-get-profile-settings'
import { useQueryClient } from '@tanstack/react-query'

interface IProfileForm {
  username: string
  firstName: string
  lastName: string
  birthDate: Date | undefined
  countryId: string
  regionId: string
  cityId: string
  aboutMe: string
}

const defaultValues = {
  username: '',
  firstName: '',
  lastName: '',
  birthDate: undefined,
  countryId: '',
  regionId: '',
  cityId: '',
  aboutMe: '',
}

export default function ProfileForm() {
  //const { data: me } = useMeQuery() // ранее использовалось для отображения имени пользователя в профиле
  const dict = useTranslations()
  const queryClient = useQueryClient()
  const { data: profile } = useGetProfileSettingsQuery()
  const { mutateAsync: updateProfile } = useUpdateProfileSettingsMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<IProfileForm>({
    defaultValues: defaultValues,
    mode: 'onChange',
    values: profile
      ? {
          username: profile.username || '',
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          aboutMe: profile.aboutMe || '',
          birthDate: profile.birthDate ? new Date(profile.birthDate) : undefined,
          countryId: profile.country?.id ? String(profile.country.id) : '',
          regionId:
            profile.region?.id && queryClient.getQueryData(GEO_REGIONS_QUERY_KEY(profile.country?.id))
              ? String(profile.region.id)
              : '',

          cityId:
            profile.city?.id && queryClient.getQueryData(GEO_CITIES_QUERY_KEY(profile.country?.id, profile.region?.id))
              ? String(profile.city.id)
              : '',
        }
      : undefined,
    resetOptions: {
      keepDirtyValues: true,
      keepIsValid: false,
    },
  })

  const selectedCountryId = useWatch({ control, name: 'countryId' })
  const selectedRegionId = useWatch({ control, name: 'regionId' })

  const { data: countriesData } = useCountriesQuery()
  const { data: regionsData } = useRegionsQuery(Number(selectedCountryId))
  const { data: citiesData } = useCitiesQuery(Number(selectedCountryId), Number(selectedRegionId))

  const countries = countriesData?.result || []
  const regions = regionsData?.result || []
  const cities = citiesData?.result || []

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
    const hasAllGeoIds = Boolean(data.countryId && data.regionId && data.cityId)

    const formattedBirthDate =
      data.birthDate && !isNaN(data.birthDate.getTime())
        ? `${data.birthDate.getFullYear()}-${String(data.birthDate.getMonth() + 1).padStart(2, '0')}-${String(data.birthDate.getDate()).padStart(2, '0')}`
        : null
    //Эта строка защищает от «сдвига даты на день назад» из-за разницы часовых поясов пользователя и сервера.
    // Когда вы берете стандартный метод .toISOString(), он принудительно переводит время в формат UTC (нулевой часовой пояс).
    // Ручная сборка через .getFullYear(), .getMonth() и .getDate() берет локальное время с компьютера пользователя «как есть», вообще игнорируя часовые пояса.

    const requestBody: UpdateProfileSettingsRequestDto = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: formattedBirthDate,
      aboutMe: data.aboutMe ? data.aboutMe : null,
      countryId: hasAllGeoIds ? Number(data.countryId) : null,
      regionId: hasAllGeoIds ? Number(data.regionId) : null,
      cityId: hasAllGeoIds ? Number(data.cityId) : null,
    }

    try {
      await updateProfile(requestBody)
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
          name="birthDate"
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
            {...register('countryId', { required: dict.profileForm.countryRequired })}
            className={`${s.select} ${errors.countryId ? s.selectError : ''}`}
          >
            <option value="">{dict.profileForm.country}</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.countryId && <span className={s.errorMessage}>{errors.countryId.message}</span>}
        </div>

        <div className={s.rowItem}>
          <label className={s.label}>{dict.profileForm.selectYourRegion}</label>
          <select
            id="region"
            {...register('regionId', { required: dict.profileForm.regionRequired })}
            className={`${s.select} ${errors.regionId ? s.selectError : ''}`}
            disabled={!selectedCountryId}
          >
            <option value="">{dict.profileForm.region}</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          {errors.regionId && <span className={s.errorMessage}>{errors.regionId.message}</span>}
        </div>

        <div className={s.rowItem}>
          <label className={s.label}>{dict.profileForm.selectYourCity}</label>
          <select
            id="city"
            {...register('cityId', { required: dict.profileForm.cityRequired })}
            className={`${s.select} ${errors.cityId ? s.selectError : ''}`}
            disabled={!selectedRegionId}
          >
            <option value="">{dict.profileForm.city}</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.cityId && <span className={s.errorMessage}>{errors.cityId.message}</span>}
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
        <Button type="submit" variant="primary" disabled={isSubmitting || !isValid} width="auto">
          {isSubmitting ? dict.profileForm.saving : dict.profileForm.saveChanges}
        </Button>
      </div>
    </form>
  )
}
