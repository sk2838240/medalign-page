type SectionImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  decorative?: boolean
}

export default function SectionImage({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  priority = false,
  sizes,
  decorative = false,
}: SectionImageProps) {
  return (
    <figure className={`m-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt={decorative ? '' : alt}
        aria-hidden={decorative ? true : undefined}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        className={imgClassName}
      />
    </figure>
  )
}
