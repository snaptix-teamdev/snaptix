import { StaticImageData } from 'next/image'
import flagRussia from '../../../../../public/png/flagRussia.png'
import flagUnitedKingdom from '../../../../../public/png/flagUnitedKingdom.png'

export interface Language {
  value: string
  label: string
  flag: StaticImageData
}

export const languages: Language[] = [
  { value: 'en', label: 'English', flag: flagUnitedKingdom },
  { value: 'ru', label: 'Russian', flag: flagRussia },
]
