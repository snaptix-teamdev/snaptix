import type { CSSProperties } from 'react'

export type PostFilter = {
  id: string
  label: string
  style: CSSProperties
}

export const POST_FILTERS: PostFilter[] = [
  { id: 'normal', label: 'Normal', style: {} },
  { id: 'clarendon', label: 'Clarendon', style: { filter: 'contrast(1.2) saturate(1.35)' } },
  { id: 'gingham', label: 'Gingham', style: { filter: 'brightness(1.05) hue-rotate(-10deg) saturate(0.9)' } },
  { id: 'moon', label: 'Moon', style: { filter: 'grayscale(1) contrast(1.1) brightness(1.1)' } },
  { id: 'lark', label: 'Lark', style: { filter: 'contrast(0.9) brightness(1.1) saturate(1.1)' } },
  { id: 'reyes', label: 'Reyes', style: { filter: 'sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75)' } },
  { id: 'juno', label: 'Juno', style: { filter: 'sepia(0.35) contrast(1.15) brightness(1.15) saturate(1.8)' } },
  { id: 'slumber', label: 'Slumber', style: { filter: 'saturate(0.66) brightness(1.05)' } },
  {
    id: 'crema',
    label: 'Crema',
    style: { filter: 'sepia(0.5) contrast(1.25) brightness(1.15) saturate(0.9) hue-rotate(-2deg)' },
  },
  { id: 'aden', label: 'Aden', style: { filter: 'sepia(0.2) brightness(1.15) saturate(1.4) hue-rotate(-10deg)' } },
  { id: 'perpetua', label: 'Perpetua', style: { filter: 'contrast(1.1) brightness(1.25) saturate(1.1)' } },
  { id: 'inkwell', label: 'Inkwell', style: { filter: 'sepia(0.3) contrast(1.1) brightness(1.1) grayscale(0.3)' } },
]
