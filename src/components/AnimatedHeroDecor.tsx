import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { Heart } from 'lucide-react'

export function AnimatedHeroDecor() {
  const decorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!decorRef.current) return

    const animation = animate(decorRef.current.querySelectorAll('.hero-spark'), {
      translateY: [-10, 18],
      translateX: [-6, 8],
      opacity: [0.32, 0.9],
      scale: [0.82, 1.15],
      delay: (_target: unknown, index = 0) => index * 190,
      duration: 2600,
      direction: 'alternate',
      loop: true,
      ease: 'inOutSine',
    })

    return () => {
      animation.pause()
    }
  }, [])

  return (
    <div ref={decorRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          className="hero-spark absolute rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.9)]"
          key={index}
          style={{
            width: `${6 + (index % 4) * 3}px`,
            height: `${6 + (index % 4) * 3}px`,
            left: `${8 + ((index * 17) % 86)}%`,
            top: `${10 + ((index * 23) % 76)}%`,
          }}
        />
      ))}
      <Heart className="hero-spark absolute left-[76%] top-[18%] h-5 w-5 text-rose-200/80" />
      <Heart className="hero-spark absolute left-[18%] top-[72%] h-4 w-4 text-rose-300/70" />
    </div>
  )
}
