'use client'

import { useState, useRef } from 'react'
import { ArrowLeft, Plus, Pin } from 'lucide-react'

type PolaroidData = {
  id: string
  caption: string
  date: string
  tape: 'coral' | 'mustard' | 'sage' | 'sky'
  rotate: string
  src?: string
}

const TAPE_COLORS: Record<PolaroidData['tape'], string> = {
  coral: '#E2896A',
  mustard: '#EFBF3E',
  sage: '#8FA888',
  sky: '#7CA3C4',
}

const initialPolaroids: PolaroidData[] = [
  { id: 'p1', caption: 'aquela viagem inesquecível ♡', date: '2019', tape: 'coral', rotate: '-rotate-3' },
  { id: 'p2', caption: 'a risada que não parava mais', date: '2022', tape: 'mustard', rotate: 'rotate-2' },
  { id: 'p3', caption: 'domingo sem plano nenhum', date: 'hoje', tape: 'sage', rotate: '-rotate-1' },
]

const notes = [
  { year: '2019', text: 'O dia em que tudo começou', tape: 'coral' as const },
  { year: '2022', text: 'Nossa viagem mais caótica', tape: 'sky' as const },
  { year: 'Hoje', text: 'Ainda rindo das mesmas coisas', tape: 'sage' as const },
]

function Tape({ color, className = '' }: { color: string; className?: string }) {
  return (
    <div
      className={`absolute h-6 w-16 opacity-80 ${className}`}
      style={{
        background: color,
        boxShadow: '0 1px 2px rgba(0,0,0,.15)',
      }}
    />
  )
}

function Polaroid({
  data,
  onUpload,
}: {
  data: PolaroidData
  onUpload?: (file: File) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={`group relative ${data.rotate} transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]`}>
      <Tape color={TAPE_COLORS[data.tape]} className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <div className="bg-[#FBF7EE] p-3 pb-10 shadow-[0_8px_20px_rgba(43,38,32,.18)]">
        <label
          htmlFor={onUpload ? `upload-${data.id}` : undefined}
          className={`relative grid aspect-[4/3] place-items-center overflow-hidden bg-[#DED2B5] ${
            onUpload ? 'cursor-pointer' : ''
          }`}
        >
          {data.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.src} alt={data.caption} className="h-full w-full object-cover" />
          ) : onUpload ? (
            <span className="flex flex-col items-center gap-1 text-[#8A7F66]">
              <Plus className="h-8 w-8" />
              <span className="font-mono text-[10px] uppercase tracking-[.15em]">Adicionar foto</span>
            </span>
          ) : (
            <div
              className="h-full w-full"
              style={{ background: `linear-gradient(135deg, ${TAPE_COLORS[data.tape]}55, #FBF7EE)` }}
            />
          )}
          {onUpload && (
            <input
              id={`upload-${data.id}`}
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onUpload(file)
              }}
            />
          )}
        </label>
        <p className="mt-4 text-center font-[cursive] text-lg leading-tight text-[#2B2620]">
          {data.caption}
        </p>
        <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[.15em] text-[#8A7F66]">
          {data.date}
        </p>
      </div>
    </div>
  )
}

export function SiteDeAmizadePage() {
  const [polaroids, setPolaroids] = useState(initialPolaroids)
  const [coverSrc, setCoverSrc] = useState<string | undefined>(undefined)

  function handleUpload(id: string, file: File) {
    const url = URL.createObjectURL(file)
    setPolaroids((prev) => prev.map((p) => (p.id === id ? { ...p, src: url } : p)))
  }

  return (
    <main className="min-h-screen bg-[#E4D9BE] px-5 py-8 text-[#2B2620] sm:px-10">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <a href="/#exemplos" className="inline-flex items-center gap-2 font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#2B2620] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E4D9BE] rounded-sm">
          <ArrowLeft className="h-4 w-4" /> Morecos
        </a>
        <span className="rotate-2 rounded-full bg-[#EFBF3E] px-4 py-2 text-sm font-bold shadow-sm">
          melhores amigas ✦
        </span>
      </header>

      <section className="mx-auto max-w-6xl py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Pin className="h-9 w-9 text-[#E2896A]" />
            <h1 className="mt-6 text-5xl font-black leading-[0.95] sm:text-7xl">
              A vida fica mais divertida com você.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[#2B2620]/70">
              Um mural para guardar piadas internas, fotos tremidas e todas as aventuras que
              ninguém mais entenderia.
            </p>
          </div>

          <Polaroid
            data={{
              id: 'cover',
              caption: 'aquela viagem inesquecível ♡',
              date: '2019',
              tape: 'coral',
              rotate: 'rotate-2',
              src: coverSrc,
            }}
            onUpload={(file) => setCoverSrc(URL.createObjectURL(file))}
          />
        </div>

        {/* mural de fotos */}
        <div className="mt-24">
          <h2 className="font-mono text-xs uppercase tracking-[.2em] text-[#8A7F66]">Mural</h2>
          <div className="mt-6 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {polaroids.map((p) => (
              <Polaroid key={p.id} data={p} onUpload={(file) => handleUpload(p.id, file)} />
            ))}
          </div>
        </div>

        {/* recadinhos */}
        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {notes.map((n, i) => (
            <article
              key={n.year}
              className={`relative min-h-48 p-7 shadow-lg ${
                ['-rotate-2', 'rotate-1', '-rotate-1'][i]
              } bg-[#FBF7EE]`}
            >
              <Tape color={TAPE_COLORS[n.tape]} className="-top-3 -left-3 rotate-6" />
              <b className="text-3xl">{n.year}</b>
              <p className="mt-10 text-xl font-bold">{n.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}