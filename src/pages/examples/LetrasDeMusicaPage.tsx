import { useEffect, useState } from 'react'
import { ArrowLeft, Disc3, Pause, Play, SkipBack, SkipForward } from 'lucide-react'

// Letra 100% autoral, criada para esta página — sem vínculo com nenhuma obra existente.
const LETRA = [
  { tempo: 0, texto: 'Guardei seu nome num bolso de casaco velho' },
  { tempo: 4, texto: 'Pra usar nos dias em que o frio chega cedo' },
  { tempo: 8, texto: 'Cidade grande, tanta gente andando' },
  { tempo: 12, texto: 'E eu só decorando teu jeito de rir baixinho' },
  { tempo: 17, texto: 'Cada verso me faz lembrar de você', refrao: true },
  { tempo: 21, texto: 'Cada esquina vira um jeito de te ver', refrao: true },
  { tempo: 25, texto: 'Nem o tempo sabe onde eu escondi', refrao: true },
  { tempo: 29, texto: 'Esse tanto de saudade que cabe em mim', refrao: true },
  { tempo: 34, texto: 'Deixei um mapa debaixo do travesseiro' },
  { tempo: 38, texto: 'Marcando os lugares onde eu quase disse' },
  { tempo: 42, texto: 'Que não existe pressa nem estrada certa' },
  { tempo: 46, texto: 'Quando o caminho todo é a tua presença' },
  { tempo: 51, texto: 'Cada verso me faz lembrar de você', refrao: true },
  { tempo: 55, texto: 'Cada esquina vira um jeito de te ver', refrao: true },
  { tempo: 60, texto: 'E se um dia o mundo inteiro escurecer' },
  { tempo: 64, texto: 'Ainda vou cantando isso, baixinho, pra você' },
]

const DURACAO_TOTAL = LETRA[LETRA.length - 1].tempo + 5

export function LetrasDeMusicaPage() {
  const [tocando, setTocando] = useState(true)
  const [tempo, setTempo] = useState(0)

  useEffect(() => {
    if (!tocando) return
    const id = setInterval(() => {
      setTempo((t) => (t + 1 >= DURACAO_TOTAL ? 0 : t + 1))
    }, 1000)
    return () => clearInterval(id)
  }, [tocando])

  const linhaAtivaIndex = [...LETRA].reverse().findIndex((l) => l.tempo <= tempo)
  const ativaIndex = linhaAtivaIndex === -1 ? 0 : LETRA.length - 1 - linhaAtivaIndex
  const progresso = Math.min(100, (tempo / DURACAO_TOTAL) * 100)

  const formatar = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <main className="min-h-screen bg-[#100b1d] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <a href="/#exemplos" className="inline-flex items-center gap-2 text-sm text-violet-300 transition hover:text-violet-200">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </a>

        <section className="grid min-h-[85vh] items-center gap-14 py-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-white/5 p-7 shadow-2xl shadow-fuchsia-900/30 backdrop-blur">
            <div className="grid aspect-square place-items-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-600 to-rose-500 shadow-xl">
              <Disc3
                className="h-32 w-32 text-white/80"
                style={{
                  animation: tocando ? 'spin 8s linear infinite' : 'none',
                }}
              />
            </div>
            <p className="mt-8 text-xl font-bold">Bolso de Casaco</p>
            <p className="mt-1 text-sm text-white/50">Marés Internas · single autoral</p>

            <div className="mt-7 h-1 rounded bg-white/15">
              <div className="h-full rounded bg-fuchsia-400 transition-[width]" style={{ width: `${progresso}%` }} />
            </div>
            <div className="mt-2 flex justify-between mono text-[11px] text-white/40">
              <span>{formatar(tempo)}</span>
              <span>{formatar(DURACAO_TOTAL)}</span>
            </div>

            <div className="mt-7 flex items-center justify-center gap-8">
              <button
                aria-label="Voltar linha"
                onClick={() => setTempo((t) => Math.max(0, t - 5))}
                className="text-white/70 transition hover:text-white"
              >
                <SkipBack />
              </button>
              <button
                aria-label={tocando ? 'Pausar' : 'Tocar'}
                onClick={() => setTocando((v) => !v)}
                className="grid h-14 w-14 place-items-center rounded-full bg-white text-zinc-950 transition hover:bg-white/90"
              >
                {tocando ? <Pause /> : <Play />}
              </button>
              <button
                aria-label="Avançar linha"
                onClick={() => setTempo((t) => Math.min(DURACAO_TOTAL, t + 5))}
                className="text-white/70 transition hover:text-white"
              >
                <SkipForward />
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[.25em] text-fuchsia-400">Tocando agora</p>
            <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">Bolso de Casaco</h1>
            <p className="mt-3 text-sm text-white/40">Letra original — livre de direitos autorais de terceiros</p>

            <div className="mt-10 space-y-4 text-xl leading-9">
              {LETRA.map((linha, i) => (
                <p
                  key={i}
                  className={
                    i === ativaIndex
                      ? 'text-white transition-colors'
                      : linha.refrao
                        ? 'text-white/35 transition-colors'
                        : 'text-white/25 transition-colors'
                  }
                >
                  {linha.texto}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}