import { ArrowLeft, ArrowDown, CalendarHeart, Heart, Quote, Sparkles } from 'lucide-react'

const moments = [
  { date: '12 jan 2024', title: 'O primeiro encontro', text: 'Um café despretensioso que durou muito mais do que o planejado.' },
  { date: '24 jun 2024', title: 'Nossa primeira viagem', text: 'Dias leves, muitas fotos e a certeza de que queríamos viver muito mais.' },
  { date: '08 mar 2025', title: 'Um novo capítulo', text: 'Começamos a construir novos planos, sonhos e um cantinho só nosso.' },
]

export function SiteDeNamoroPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7f8] text-[#4b1725]">
      <nav className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-white/90" href="/#exemplos">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </a>
          <p className="font-serif text-lg italic text-white">Ana & Lucas</p>
          <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-white/70 sm:block">Desde 2024</span>
        </div>
      </nav>

      <section className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-[#8f2445] via-[#bc4163] to-[#e78ba1] px-5 pb-20 pt-28 text-center text-white">
        <div className="absolute -left-24 top-20 -z-10 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl" />
        <div className="absolute -right-28 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-rose-950/20 blur-3xl" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="mx-auto max-w-4xl">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
            <Heart className="h-7 w-7 fill-white" />
          </span>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-white/70">A nossa história</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
            Você é o meu<br /><em className="font-normal">lugar favorito.</em>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            Um cantinho para guardar as memórias, os sorrisos e todos os detalhes que fazem a nossa história ser única.
          </p>
          <a className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-rose-900 shadow-xl transition hover:-translate-y-1" href="#historia">
            Conheça nossa história <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="historia">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-lg pb-12 pr-8">
            <div className="aspect-[4/5] rounded-t-[10rem] bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100 p-5 shadow-2xl shadow-rose-900/10">
              <div className="grid h-full place-items-center rounded-t-[9rem] border border-white/70 bg-white/20">
                <Heart className="h-24 w-24 fill-white/60 text-white/70" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-48 rotate-3 rounded-2xl bg-white p-4 shadow-xl sm:w-56">
              <div className="grid aspect-square place-items-center rounded-xl bg-gradient-to-br from-rose-300 to-red-300">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <p className="mt-3 text-center font-serif italic">Nosso dia favorito ♡</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Onde tudo começou</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Um encontro simples mudou todos os nossos planos.</h2>
            <p className="mt-7 text-lg leading-9 text-rose-950/65">
              A conversa começou tímida, o café esfriou e, quando percebemos, horas tinham passado. Desde aquele dia, encontramos infinitas razões para escolher um ao outro.
            </p>
            <div className="mt-9 flex gap-8 border-t border-rose-200 pt-7">
              <div><strong className="font-serif text-3xl">2</strong><p className="mt-1 text-sm text-rose-900/55">anos juntos</p></div>
              <div><strong className="font-serif text-3xl">18</strong><p className="mt-1 text-sm text-rose-900/55">lugares visitados</p></div>
              <div><strong className="font-serif text-3xl">∞</strong><p className="mt-1 text-sm text-rose-900/55">planos pela frente</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#59172c] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <CalendarHeart className="mx-auto h-9 w-9 text-rose-300" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-rose-300">Momentos inesquecíveis</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl">Nossa linha do tempo</h2>
          </div>
          <div className="relative mt-16 grid gap-5 md:grid-cols-3 md:before:absolute md:before:left-[16%] md:before:right-[16%] md:before:top-4 md:before:h-px md:before:bg-rose-300/30">
            {moments.map((moment, index) => (
              <article className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur" key={moment.date}>
                <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-rose-300 text-xs font-bold text-rose-950">{index + 1}</span>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-rose-300">{moment.date}</p>
                <h3 className="mt-2 font-serif text-2xl">{moment.title}</h3>
                <p className="mt-3 leading-7 text-white/60">{moment.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-rose-200 bg-white px-7 py-14 text-center shadow-xl shadow-rose-900/5 sm:px-16 sm:py-20">
          <Quote className="mx-auto h-10 w-10 fill-rose-100 text-rose-400" />
          <blockquote className="mt-7 font-serif text-3xl leading-snug sm:text-5xl">
            “Se eu pudesse escolher de novo, encontraria você mais cedo para te amar por mais tempo.”
          </blockquote>
          <p className="mt-8 font-semibold text-rose-700">Com amor, Ana</p>
        </div>
      </section>

      <footer className="border-t border-rose-200 px-5 py-10 text-center">
        <Heart className="mx-auto h-5 w-5 fill-rose-500 text-rose-500" />
        <p className="mt-3 font-serif text-xl italic">Ana & Lucas</p>
        <a className="mt-5 inline-block text-sm font-semibold text-rose-700 underline underline-offset-4" href="/#contato">Quero criar uma página assim</a>
      </footer>
    </main>
  )
}
