import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: number
  color?: string
  className?: string
}

export default function StarRating({
  rating,
  size = 14,
  color = '#F59E0B',
  className = '',
}: StarRatingProps) {
  return (
    <span
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`Note : ${rating} sur 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const partial = !filled && i < rating
        const pct = partial ? Math.round((rating % 1) * 100) : 0
        const uid = `sr-${color.replace('#', '')}-${size}-${i}`
        return (
          <span
            key={i}
            className="relative inline-block flex-shrink-0"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            {partial ? (
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                <defs>
                  <linearGradient id={uid} x1="0" x2="1" y1="0" y2="0">
                    <stop offset={`${pct}%`} stopColor={color} />
                    <stop offset={`${pct}%`} stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#${uid})`}
                />
              </svg>
            ) : (
              <Star
                style={{
                  width: size,
                  height: size,
                  color: filled ? color : '#E5E7EB',
                  fill: filled ? color : '#E5E7EB',
                  display: 'block',
                }}
              />
            )}
          </span>
        )
      })}
    </span>
  )
}
