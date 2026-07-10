import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronDown,
  CreditCard,
  ExternalLink,
  Gem,
  Heart,
  Layers,
  MonitorSmartphone,
  X,
  type LucideIcon,
} from 'lucide-react'
import { sectionMotion } from './siteData'
import { SectionTitle } from './SectionTitle'

type ExampleProject = {
  title: string
  text: string
  tag: string
  icon: LucideIcon
  gradient: string
  stack: string[]
  payment: string
  demoUrl: string
}

const examples: ExampleProject[] = [
  {
    title: 'Site de namoro',
    text: 'Uma página romântica para celebrar o casal, fazer uma surpresa ou um pedido especial.',
    tag: 'Namoro',
    icon: Heart,
    gradient: 'from-rose-200 via-rose-100 to-white',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/site-de-namoro',
  },
  {
    title: 'Site de amizade',
    text: 'Uma homenagem digital com fotos, mensagens e momentos de uma amizade especial.',
    tag: 'Amizade',
    icon: Heart,
    gradient: 'from-amber-100 via-rose-50 to-white',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/site-de-amizade',
  },
  {
    title: 'Landing page',
    text: 'Uma página direta para apresentar serviços, campanhas e conquistar novos clientes.',
    tag: 'Landing page',
    icon: MonitorSmartphone,
    gradient: 'from-sky-100 via-rose-50 to-white',
    stack: ['React', 'Tailwind CSS'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/landing-page',
  },
  {
    title: 'Letras de música',
    text: 'Uma experiência visual para apresentar uma música, letra ou dedicatória especial.',
    tag: 'Música',
    icon: Gem,
    gradient: 'from-violet-100 via-rose-50 to-white',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/letras-de-musica',
  },
  {
    title: 'Convite de evento',
    text: 'Um convite digital com informações, localização, contagem regressiva e confirmação de presença.',
    tag: 'Evento',
    icon: Heart,
    gradient: 'from-amber-100 via-rose-50 to-white',
    stack: ['React', 'Framer Motion', 'Firebase'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/convite-de-evento',
  },
  {
    title: 'Timeline',
    text: 'Uma linha do tempo interativa para organizar datas, fotos e momentos inesquecíveis.',
    tag: 'Timeline',
    icon: Layers,
    gradient: 'from-emerald-100 via-rose-50 to-white',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/timeline',
  },
  {
    title: 'Nossa história',
    text: 'Um espaço especial para contar uma história completa com capítulos, fotos e mensagens.',
    tag: 'História',
    icon: Heart,
    gradient: 'from-fuchsia-100 via-rose-50 to-white',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/nossa-historia',
  },
  {
    title: 'Portfólio',
    text: 'Uma apresentação profissional para destacar trabalhos, habilidades, projetos e contatos.',
    tag: 'Portfólio',
    icon: MonitorSmartphone,
    gradient: 'from-cyan-100 via-rose-50 to-white',
    stack: ['React', 'Tailwind CSS'],
    payment: 'Pagamento único',
    demoUrl: '/exemplo/portfolio',
  },
]

const INITIAL_COUNT = 6
const DESKTOP_QUERY = '(min-width: 768px)'
const CLOSE_OFFSET = 120
const CLOSE_VELOCITY = 500

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY)
    setIsDesktop(mediaQuery.matches)
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

function ExampleCard({ example, index, onOpen }: { example: ExampleProject; index: number; onOpen: () => void }) {
  const Icon = example.icon

  return (
    <motion.article
      layout
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm shadow-rose-950/5 transition-shadow duration-500 hover:shadow-xl hover:shadow-rose-950/10"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
    >
      <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${example.gradient} sm:h-40`}>
        <div className="flex items-center gap-1.5 px-4 pt-3">
          <span className="h-2 w-2 rounded-full bg-rose-300/70" />
          <span className="h-2 w-2 rounded-full bg-rose-300/50" />
          <span className="h-2 w-2 rounded-full bg-rose-300/40" />
        </div>
        <motion.div
          className="absolute inset-0 grid place-items-center pt-4"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-rose-800 shadow-lg shadow-rose-950/10 backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="h-7 w-7" />
          </span>
        </motion.div>
        <span className="absolute left-4 top-9 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-rose-900 shadow-sm backdrop-blur">
          {example.tag}
        </span>
        <span className="absolute bottom-3 right-3 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-white/90 text-rose-900 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-zinc-950">{example.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{example.text}</p>
      </div>
    </motion.article>
  )
}

function ExampleSheet({ example, onClose }: { example: ExampleProject | null; onClose: () => void }) {
  const isDesktop = useIsDesktop()
  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 380, damping: 36 })

  useEffect(() => {
    y.set(0)
    document.body.style.overflow = example ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [example, y])

  useEffect(() => {
    if (!example) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [example, onClose])

  function handlePan(_: unknown, info: PanInfo) {
    const next = y.get() + info.delta.y
    y.set(next < 0 ? next * 0.15 : next)
  }

  function handlePanEnd(_: unknown, info: PanInfo) {
    if (y.get() > CLOSE_OFFSET || info.velocity.y > CLOSE_VELOCITY) {
      onClose()
    } else {
      y.set(0)
    }
  }

  const content = example ? (
    <>
      <motion.div
        className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-rose-900 shadow-sm ${example.gradient}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <example.icon className="h-7 w-7" />
      </motion.div>

      <span className="mt-4 inline-flex w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-900">
        {example.tag}
      </span>

      <h3 className="mt-3 text-2xl font-semibold text-zinc-950">{example.title}</h3>
      <p className="mt-3 text-base leading-7 text-zinc-600">{example.text}</p>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-800">
            <Layers className="h-3.5 w-3.5" />
            Tecnologias usadas
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {example.stack.map((tech, index) => (
              <motion.span
                key={tech}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.06, duration: 0.3 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-800">
            <CreditCard className="h-3.5 w-3.5" />
            Forma de pagamento
          </div>
          <p className="mt-2 text-sm font-medium text-zinc-800">{example.payment}</p>
        </div>
      </div>

      <a
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-900 hover:shadow-xl"
        href={example.demoUrl}
        rel="noreferrer"
        target="_blank"
      >
        Acessar site de exemplo
        <ExternalLink className="h-4 w-4" />
      </a>
    </>
  ) : null

  return (
    <AnimatePresence>
      {example ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-zinc-950/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {isDesktop ? (
            <div className="fixed inset-0 z-[70] grid place-items-center p-6">
              <motion.div
                key="modal"
                className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-y-auto overscroll-contain rounded-[32px] border border-rose-100 bg-white/95 p-8 shadow-[0_30px_80px_-24px_rgba(159,18,57,0.4)] backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  aria-label="Fechar"
                  className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-colors duration-200 hover:bg-rose-50 hover:text-rose-900"
                  onClick={onClose}
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
                {content}
              </motion.div>
            </div>
          ) : (
            <motion.div
              key="sheet"
              className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] rounded-t-[32px] border border-rose-100 bg-white/95 shadow-[0_-24px_60px_-20px_rgba(159,18,57,0.35)] backdrop-blur-xl"
              style={{ y: springY }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <motion.div
                className="flex cursor-grab touch-none justify-center pb-3 pt-3 active:cursor-grabbing"
                onPan={handlePan}
                onPanEnd={handlePanEnd}
              >
                <span className="h-1.5 w-12 rounded-full bg-rose-300/70" />
              </motion.div>

              <div className="flex max-h-[calc(85vh-32px)] flex-col overflow-y-auto overscroll-contain px-6 pb-10 pt-1 sm:px-8">
                {content}
              </div>
            </motion.div>
          )}
        </>
      ) : null}
    </AnimatePresence>
  )
}

export function Examples() {
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState<ExampleProject | null>(null)
  const visibleExamples = showAll ? examples : examples.slice(0, INITIAL_COUNT)
  const hasMore = examples.length > INITIAL_COUNT

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8" id="exemplos">
      <motion.div className="mx-auto max-w-7xl" {...sectionMotion}>
        <SectionTitle
          eyebrow="Exemplos"
          text="Veja algumas ideias do que posso criar para você. Cada página recebe suas fotos, seus textos, suas cores e a personalidade da ocasião."
          title="Uma página especial para cada história"
        />

        <motion.div layout className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visibleExamples.map((example, index) => (
              <ExampleCard
                example={example}
                index={showAll ? index % INITIAL_COUNT : index}
                key={example.title}
                onOpen={() => setSelected(example)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore ? (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="group inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-rose-950 shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-md"
              whileTap={{ scale: 0.96 }}
            >
              {showAll ? 'Mostrar menos' : 'Mostrar mais projetos'}
              <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </div>
        ) : null}
      </motion.div>

      <ExampleSheet example={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
