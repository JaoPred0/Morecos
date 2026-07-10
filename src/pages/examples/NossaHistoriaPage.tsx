import type { ReactNode } from 'react'
import { ArrowLeft, BookHeart, Compass, Home, Music2, Sparkles } from 'lucide-react'

function Polaroid({
  rotate,
  legenda,
  children,
  className = '',
}: {
  rotate: number
  legenda: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-fit bg-[#fbf6ea] p-3 pb-5 shadow-[0_10px_25px_-8px_rgba(62,48,39,0.35)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-3deg] bg-[#d9c9a3]/70"
      />
      <div className="aspect-[4/5] w-full overflow-hidden bg-[#ece1c8]">{children}</div>
      <p className="mt-3 text-center font-serif text-sm italic text-[#8a6247]">{legenda}</p>
    </div>
  )
}

function CenaEncontro() {
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full">
      <rect width="200" height="250" fill="#f3d9b1" />
      <circle cx="150" cy="60" r="26" fill="#e7a25c" opacity="0.8" />
      <path d="M0,190 Q100,150 200,190 L200,250 L0,250 Z" fill="#c98a56" opacity="0.55" />
      <path d="M0,210 Q100,175 200,210 L200,250 L0,250 Z" fill="#a86c40" opacity="0.6" />
      <circle cx="82" cy="196" r="7" fill="#3e3027" />
      <rect x="78" y="203" width="8" height="20" fill="#3e3027" />
      <circle cx="108" cy="196" r="7" fill="#3e3027" />
      <rect x="104" y="203" width="8" height="20" fill="#3e3027" />
      <line x1="90" y1="213" x2="100" y2="213" stroke="#3e3027" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function CenaViagem() {
  return (
    <svg viewBox="0 0 200 250" className="h-full w-full">
      <rect width="200" height="250" fill="#e4d3ae" />
      <path
        d="M20,60 C60,40 90,90 130,70 S180,40 190,70"
        fill="none"
        stroke="#8a6247"
        strokeWidth="2"
        strokeDasharray="4 6"
        opacity="0.7"
      />
      <circle cx="20" cy="60" r="4" fill="#a14f4f" />
      <circle cx="190" cy="70" r="4" fill="#a14f4f" />
      <g transform="translate(55,140)">
        <rect x="0" y="20" width="90" height="60" rx="6" fill="#a86c40" />
        <rect x="0" y="20" width="90" height="14" fill="#8a6247" />
        <rect x="36" y="4" width="18" height="20" rx="3" fill="#8a6247" />
        <rect x="14" y="44" width="20" height="20" fill="#f3d9b1" opacity="0.6" />
        <rect x="56" y="44" width="20" height="20" fill="#f3d9b1" opacity="0.6" />
      </g>
    </svg>
  )
}

const MEMORIAS = [
  { Icon: Compass, cor: '#a14f4f', legenda: 'a bússola que nos achou' },
  { Icon: Music2, cor: '#8a6247', legenda: 'a trilha sonora de tudo' },
  { Icon: Sparkles, cor: '#c98a56', legenda: 'as noites sem pressa' },
  { Icon: Home, cor: '#5d4a3c', legenda: 'o lugar que viramos lar' },
]

export function NossaHistoriaPage() {
  return (
    <main className="min-h-screen bg-[#f4ead8] px-5 py-8 text-[#3e3027]">
      <div className="mx-auto max-w-5xl rounded-sm border border-[#9c7658]/30 bg-[#fbf6ea] shadow-2xl">
        <header className="border-b border-[#9c7658]/20 px-8 py-16 text-center">
          <a href="/#exemplos" className="inline-flex items-center gap-2 text-sm text-[#8a6247]">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </a>
          <BookHeart className="mx-auto mt-10 h-10 w-10 text-[#a14f4f]" />
          <p className="mt-6 font-serif italic text-[#8a6247]">Era uma vez...</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-7xl">A história de nós dois</h1>
        </header>

        <div className="grid gap-0 lg:grid-cols-2">
          <article className="border-b border-[#9c7658]/20 p-10 lg:border-b-0 lg:border-r">
            <span className="font-serif text-6xl text-[#a14f4f]/20">01</span>
            <h2 className="mt-4 font-serif text-3xl">Quando os caminhos se cruzaram</h2>
            <p className="mt-5 font-serif text-lg leading-9 text-[#5d4a3c] first-letter:float-left first-letter:mr-2 first-letter:text-6xl">
              Nada parecia diferente naquele dia, até que um encontro simples mudou o rumo de
              tudo. A conversa fluiu e o tempo passou sem pedir licença.
            </p>
            <Polaroid rotate={-3} legenda="onde tudo começou" className="mt-8">
              <CenaEncontro />
            </Polaroid>
          </article>

          <article className="p-10">
            <span className="font-serif text-6xl text-[#a14f4f]/20">02</span>
            <h2 className="mt-4 font-serif text-3xl">Os sonhos que vieram depois</h2>
            <p className="mt-5 font-serif text-lg leading-9 text-[#5d4a3c] first-letter:float-left first-letter:mr-2 first-letter:text-6xl">
              Vieram viagens, planos e desafios. Em cada página, a certeza de que as melhores
              histórias são escritas com calma e companhia.
            </p>
            <Polaroid rotate={3} legenda="as malas que fizemos juntos" className="mt-8 ml-auto">
              <CenaViagem />
            </Polaroid>
          </article>
        </div>

        <div className="border-t border-[#9c7658]/20 px-8 py-14">
          <p className="text-center font-serif italic text-[#8a6247]">álbum de pequenas memórias</p>
          <div className="mt-8 flex flex-wrap items-start justify-center gap-8">
            {MEMORIAS.map((m, i) => (
              <Polaroid key={m.legenda} rotate={i % 2 === 0 ? -4 : 4} legenda={m.legenda} className="w-32">
                <div className="grid h-full place-items-center" style={{ backgroundColor: `${m.cor}1a` }}>
                  <m.Icon className="h-8 w-8" style={{ color: m.cor }} />
                </div>
              </Polaroid>
            ))}
          </div>
        </div>

        <footer className="border-t border-[#9c7658]/20 p-8 text-center font-serif italic text-[#8a6247]">
          continua no próximo capítulo...
        </footer>
      </div>
    </main>
  )
}