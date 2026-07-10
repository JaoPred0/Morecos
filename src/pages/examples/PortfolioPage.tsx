import { ArrowLeft, ArrowUpRight, Code2, Palette, Smartphone } from 'lucide-react'

const projects = [
  {
    name: 'Aurora Studio',
    category: 'Identidade visual · Website',
    color: 'from-orange-300 via-rose-300 to-red-400',
    year: '2026',
  },
  {
    name: 'Forma Arquitetura',
    category: 'Direção de arte · Portfólio',
    color: 'from-violet-300 via-fuchsia-300 to-indigo-500',
    year: '2026',
  },
  {
    name: 'Revista Norte',
    category: 'Design editorial · Plataforma',
    color: 'from-cyan-200 via-sky-300 to-blue-500',
    year: '2025',
  },
  {
    name: 'Casa Botânica',
    category: 'E-commerce · Fotografia',
    color: 'from-lime-200 via-emerald-300 to-green-600',
    year: '2025',
  },
]

const services = [
  { icon: Palette, title: 'Identidade', text: 'Marcas e sistemas visuais claros, marcantes e consistentes.' },
  { icon: Code2, title: 'Desenvolvimento', text: 'Sites rápidos, acessíveis e construídos com atenção aos detalhes.' },
  { icon: Smartphone, title: 'Experiência', text: 'Interfaces responsivas que funcionam bem em qualquer tela.' },
]

export function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f2f1ed] text-zinc-950">
      <nav className="sticky top-0 z-20 border-b border-zinc-950/15 bg-[#f2f1ed]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a className="text-lg font-black tracking-tight" href="#topo">JOÃO—DESIGN</a>
          <div className="flex items-center gap-5 text-sm font-semibold">
            <a className="hidden hover:underline sm:block" href="#projetos">Projetos</a>
            <a className="hidden hover:underline sm:block" href="#servicos">Serviços</a>
            <a className="inline-flex items-center gap-2 rounded-full border border-zinc-950 px-4 py-2 transition hover:bg-zinc-950 hover:text-white" href="/#exemplos">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </a>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24" id="topo">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
          Disponível para novos projetos
        </div>
        <h1 className="mt-8 max-w-6xl text-[clamp(3.3rem,9.5vw,8.5rem)] font-black leading-[0.88] tracking-[-0.065em]">
          Ideias digitais com forma e propósito.
        </h1>
        <div className="mt-12 grid gap-8 border-t border-zinc-950 pt-6 md:grid-cols-[1fr_1.4fr]">
          <p className="text-sm font-bold uppercase tracking-[0.18em]">Designer & Desenvolvedor</p>
          <p className="max-w-2xl text-xl leading-8 text-zinc-700 sm:text-2xl sm:leading-9">
            Crio identidades, interfaces e experiências digitais que ajudam boas ideias a serem vistas e lembradas.
          </p>
        </div>
      </header>

      <section className="border-t border-zinc-950" id="projetos">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-5 py-8 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Projetos selecionados</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Trabalhos recentes</h2>
          </div>
          <span className="hidden text-sm sm:block">2025—2026</span>
        </div>

        <div className="grid border-t border-zinc-950 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              className={`group border-b border-zinc-950 p-5 sm:p-8 ${index % 2 === 0 ? 'md:border-r' : ''}`}
              key={project.name}
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.color} p-5 sm:p-8`}>
                <span className="absolute right-5 top-4 text-sm font-bold text-black/50">0{index + 1}</span>
                <div className="absolute inset-x-[12%] bottom-0 top-[14%] translate-y-5 rounded-t-xl border border-white/40 bg-white/80 p-3 shadow-2xl transition-transform duration-500 group-hover:translate-y-0 sm:p-5">
                  <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-zinc-300"/><span className="h-2 w-2 rounded-full bg-zinc-300"/><span className="h-2 w-2 rounded-full bg-zinc-300"/></div>
                  <div className={`mt-4 h-[42%] rounded-md bg-gradient-to-br ${project.color}`} />
                  <div className="mt-4 h-2 w-2/3 rounded bg-zinc-900/80" />
                  <div className="mt-2 h-2 w-1/2 rounded bg-zinc-300" />
                </div>
              </div>
              <div className="flex items-start justify-between gap-5 pt-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{project.category}</p>
                  <h3 className="mt-2 text-2xl font-black sm:text-3xl">{project.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-sm sm:block">{project.year}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-zinc-950 transition group-hover:bg-zinc-950 group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="servicos">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">Como posso ajudar</p>
        <div className="mt-7 grid border-y border-zinc-950 md:grid-cols-3">
          {services.map(({ icon: Icon, title, text }, index) => (
            <article className={`py-8 md:px-8 ${index > 0 ? 'border-t border-zinc-950 md:border-l md:border-t-0' : ''}`} key={title}>
              <Icon className="h-7 w-7" />
              <h2 className="mt-8 text-2xl font-black">{title}</h2>
              <p className="mt-3 max-w-sm leading-7 text-zinc-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-zinc-950 px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">Tem uma ideia?</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">Vamos criar algo marcante juntos.</h2>
          </div>
          <a className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-zinc-950 transition hover:-translate-y-1" href="/#contato">
            Iniciar projeto <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </footer>
    </main>
  )
}
