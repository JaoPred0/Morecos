import { useState } from 'react'
import { CalendarDays, Clock, MapPin, Sparkles, Check } from 'lucide-react'

const STARS = [
  { x: 8, y: 12, r: 1.4 }, { x: 22, y: 6, r: 1 }, { x: 38, y: 16, r: 1.6 },
  { x: 55, y: 5, r: 1 }, { x: 70, y: 14, r: 1.3 }, { x: 86, y: 8, r: 1 },
  { x: 94, y: 20, r: 1.5 }, { x: 15, y: 26, r: 0.9 }, { x: 63, y: 24, r: 0.9 },
  { x: 79, y: 28, r: 1.1 },
]

const CONSTELLATION = [
  [8, 22], [22, 15, 38], [38, 55], [55, 70], [70, 86], [86, 94],
]

export function ConviteDeEventoPage() {
  const [resposta, setResposta] = useState<'idle' | 'vai' | 'nao-vai'>('idle')

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f2e27] px-5 py-10 text-[#f8ecd2] sm:py-16">
      {/* campo de estrelas ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 18%, #f8ecd2 0, transparent 60%), radial-gradient(1px 1px at 82% 8%, #f8ecd2 0, transparent 60%), radial-gradient(1.5px 1.5px at 45% 32%, #d8b875 0, transparent 60%), radial-gradient(1px 1px at 68% 60%, #f8ecd2 0, transparent 60%), radial-gradient(1px 1px at 25% 78%, #f8ecd2 0, transparent 60%), radial-gradient(1.5px 1.5px at 92% 70%, #d8b875 0, transparent 60%), radial-gradient(1px 1px at 6% 55%, #f8ecd2 0, transparent 60%), radial-gradient(1px 1px at 58% 88%, #f8ecd2 0, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl border border-[#d8b875]/50 p-3">
        <section className="relative border border-[#d8b875]/30 px-6 py-16 text-center sm:px-14 sm:py-24">
          {/* constelação — elemento assinatura */}
          <svg
            aria-hidden
            viewBox="0 0 100 32"
            className="mx-auto mb-8 h-10 w-64 opacity-80 sm:w-80"
          >
            {CONSTELLATION.map((seg, i) =>
              seg.slice(1).map((x2, j) => {
                const x1 = seg[j]
                const s1 = STARS.find((s) => s.x === x1)!
                const s2 = STARS.find((s) => s.x === x2)!
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={s1.x}
                    y1={s1.y}
                    x2={s2.x}
                    y2={s2.y}
                    stroke="#d8b875"
                    strokeWidth="0.15"
                    strokeOpacity="0.5"
                  />
                )
              })
            )}
            {STARS.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r * 0.5}
                fill={i % 3 === 0 ? '#d8b875' : '#f8ecd2'}
                className="animate-pulse"
                style={{ animationDuration: `${2.5 + (i % 4)}s`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </svg>

          <p className="font-serif text-xs uppercase tracking-[.5em] text-[#d8b875] sm:text-sm">
            Você é nosso convidado
          </p>

          <div className="mx-auto my-8 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#d8b875]/60" />
            <Sparkles className="h-3.5 w-3.5 text-[#d8b875]" />
            <span className="h-px w-14 bg-[#d8b875]/60" />
          </div>

          <h1 className="font-serif text-5xl italic leading-[1.05] sm:text-7xl">
            Jantar sob<br className="sm:hidden" /> as Estrelas
          </h1>

          <p className="mx-auto mt-7 max-w-xl font-serif text-lg leading-8 text-[#f8ecd2]/75">
            Uma noite a céu aberto para celebrar encontros, boas histórias e a companhia
            de quem torna tudo mais bonito de se viver.
          </p>

          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-9 border-y border-[#d8b875]/30 py-9 sm:grid-cols-4">
            {[
              [CalendarDays, '15 de dezembro'],
              [Clock, '19 horas'],
              [MapPin, 'Espaço Jardim'],
              [Sparkles, 'Traje esporte fino'],
            ].map(([Icon, text]) => {
              const IconComp = Icon as typeof CalendarDays
              return (
                <div key={text as string} className="flex flex-col items-center gap-3">
                  <IconComp className="h-5 w-5 text-[#d8b875]" />
                  <span className="font-serif text-sm sm:text-base">{text as string}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-12">
            {resposta === 'idle' && (
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                <button
                  onClick={() => setResposta('vai')}
                  className="border border-[#d8b875] px-7 py-3 font-serif uppercase tracking-[.18em] text-[#d8b875] transition hover:bg-[#d8b875] hover:text-[#173d35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b875]"
                >
                  Confirmar presença
                </button>
                <button
                  onClick={() => setResposta('nao-vai')}
                  className="font-serif text-sm uppercase tracking-[.18em] text-[#f8ecd2]/50 underline decoration-[#f8ecd2]/30 underline-offset-4 transition hover:text-[#f8ecd2]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b875]"
                >
                  Não poderei ir
                </button>
              </div>
            )}

            {resposta === 'vai' && (
              <div className="flex flex-col items-center gap-3 font-serif">
                <span className="flex items-center gap-2 border border-[#d8b875] px-6 py-3 uppercase tracking-[.18em] text-[#d8b875]">
                  <Check className="h-4 w-4" /> Presença confirmada
                </span>
                <p className="text-sm text-[#f8ecd2]/60">Guardaremos um lugar sob as estrelas para você.</p>
              </div>
            )}

            {resposta === 'nao-vai' && (
              <div className="flex flex-col items-center gap-3 font-serif">
                <span className="border border-[#f8ecd2]/30 px-6 py-3 uppercase tracking-[.18em] text-[#f8ecd2]/70">
                  Resposta registrada
                </span>
                <p className="text-sm text-[#f8ecd2]/60">Sentiremos sua falta — até a próxima celebração.</p>
              </div>
            )}
          </div>

          <a
            className="mt-10 inline-block font-serif text-sm text-[#f8ecd2]/50 underline decoration-[#f8ecd2]/20 underline-offset-4 transition hover:text-[#f8ecd2]/80"
            href="/#exemplos"
          >
            Voltar para Morecos
          </a>
        </section>
      </div>
    </main>
  )
}