import { Star } from 'lucide-react'

type StarsProps = {
  rating: number
}

export function Stars({ rating }: StarsProps) {
  return (
    <div className="flex gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star className={index < rating ? 'h-4 w-4 fill-current' : 'h-4 w-4 text-zinc-300'} key={index} />
      ))}
    </div>
  )
}
