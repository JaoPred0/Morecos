import { ArrowDown, ArrowLeft, CalendarHeart, Camera, Flag, Heart, MapPin, Sparkles } from 'lucide-react'

const events = [
  {
    year: '2021',
    date: '18 de setembro',
    title: 'O primeiro encontro',
    text: 'Um café rápido virou horas de conversa. Quando percebemos, o lugar já estava fechando e nenhum dos dois queria ir embora.',
    icon: Heart,
    color: 'from-rose-200 to-orange-200',
  },
  {
    year: '2022',
    date: '07 de julho',
    title: 'Nossa primeira viagem',
    text: 'Pegamos a estrada sem grandes planos. Voltamos com centenas de fotos, histórias engraçadas e vontade de conhecer o mundo juntos.',
    icon: MapPin,
    color: 'from-sky-200 to-emerald-200',
  },
  {
    year: '2024',
    date: '21 de março',
    title: 'Uma grande conquista',
    text: 'Celebramos um sonho que parecia distante quando tudo começou. Foi o dia em que entendemos o quanto já tínhamos construído.',
    icon: Sparkles,
    color: 'from-violet-200 to-fuchsia-200',
  },
  {
    year: '2026',
    date: 'O próximo capítulo',
    title: 'O futuro que imaginamos',
    text: 'Ainda existem muitos lugares, projetos e domingos tranquilos esperando por nós. Essa história está apenas começando.',
    icon: Flag,
    color: 'from-amber-200 to-rose-200',
  },
]

export function TimelinePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f3ed] text-[#183b34]">
      <nav className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-white/85" href="/#exemplos">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </a>
          <p className="font-serif text-lg text-white">Nossa jornada</p>
          <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-white/60 sm:block">2021 — 2026</span>
        </div>
      </nav>

      <header className="relative isolate grid min-h-[90vh] place-items-center overflow-hidden bg-[#173e36] px-5 pb-20 pt-28 text-center text-white">
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="max-w-4xl">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
            <CalendarHeart className="h-7 w-7 text-emerald-200" />
          </span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.26em] text-emerald-200">Uma história contada em datas</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">Momentos que<br /><em className="font-normal text-emerald-200">nos trouxeram até aqui.</em></h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">Cada ponto dessa linha guarda uma escolha, uma descoberta e uma lembrança que merece continuar viva.</p>
          <a className="mt-10 inline-flex items-center gap-2 rounded-full bg-emerald-200 px-6 py-3 font-semibold text-emerald-950 transition hover:-translate-y-1" href="#jornada">Percorrer a jornada <ArrowDown className="h-4 w-4" /></a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28" id="jornada">
        <div className="mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Nossa linha do tempo</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl">Quatro capítulos inesquecíveis</h2>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-emerald-900/20 md:left-1/2" />
          {events.map(({ year, date, title, text, icon: Icon, color }, index) => (
            <article className="relative mb-16 grid pl-14 md:grid-cols-2 md:pl-0" key={year}>
              <span className="absolute left-0 top-8 z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-[#f5f3ed] bg-emerald-800 text-white shadow-md md:left-1/2 md:-translate-x-1/2">
                <Icon className="h-4 w-4" />
              </span>

              <div className={`${index % 2 ? 'md:col-start-2 md:pl-14' : 'md:pr-14'} ${index % 2 ? '' : 'md:text-right'}`}>
                <div className="rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-xl shadow-emerald-950/5 sm:p-7">
                  <div className={`relative grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${color}`}>
                    <Camera className="h-12 w-12 text-white/70" />
                    <span className="absolute bottom-4 right-4 rounded-full bg-white/75 px-3 py-1 text-xs font-bold text-emerald-950 backdrop-blur">{year}</span>
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{date}</p>
                  <h3 className="mt-2 font-serif text-3xl">{title}</h3>
                  <p className="mt-4 leading-7 text-emerald-950/60">{text}</p>
                </div>
              </div>

              <div className={`hidden items-center md:flex ${index % 2 ? 'col-start-1 row-start-1 justify-end pr-14' : 'col-start-2 pl-14'}`}>
                <span className="font-serif text-7xl text-emerald-900/10">{year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-emerald-100 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto h-9 w-9 text-emerald-700" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Ainda há muito pela frente</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">As melhores datas ainda não chegaram.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-emerald-950/60">Continuamos escrevendo essa jornada, um dia especial de cada vez.</p>
          <a className="mt-9 inline-flex rounded-full bg-emerald-900 px-6 py-3 font-semibold text-white transition hover:-translate-y-1 hover:bg-emerald-800" href="/#contato">Quero uma timeline assim</a>
        </div>
      </section>

      <footer className="bg-[#173e36] px-5 py-9 text-center text-white/60">
        <p className="font-serif text-lg text-white">Nossa jornada</p>
        <p className="mt-2 text-sm">Feita de momentos, guardada para sempre.</p>
      </footer>
    </main>
  )
}
