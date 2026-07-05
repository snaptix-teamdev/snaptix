import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/svg/Icon'
import Image from 'next/image'
import s from './PostLayout.module.css'
import type { PostLayoutProps } from '@/entities/post/ui/Post.types'
import { useSlider } from '@/shared/hooks/useSlider'

export const PostLayout = ({ variant, images, children }: PostLayoutProps) => {
  const { hasMultipleImages, currentImageUrl, currentImageId, prevImage, nextImage } = useSlider({ images })

  return (
    <div className={`${s.container} ${s[variant]}`}>
      <section className={s.mediaSide}>
        <Image src={currentImageUrl} alt="post image" fill className={s.image} />
        {hasMultipleImages && (
          <div className={s.controls}>
            {currentImageId > 0 && (
              <button
                type={'button'}
                className={`${s.arrow} ${s.prevArrow}`}
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ArrowLeftIcon />
              </button>
            )}
            {currentImageId < images.length - 1 && (
              <button
                type={'button'}
                className={`${s.arrow} ${s.nextArrow}`}
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ArrowRightIcon />
              </button>
            )}
            <div className={s.pagination}>
              {images.map((_, i) => (
                <span key={i} className={`${s.dot} ${i === currentImageId ? s.activeDot : ''}`} />
              ))}
            </div>
          </div>
        )}
      </section>
      <section className={s.contentSide}>{children}</section>
    </div>
  )
}
