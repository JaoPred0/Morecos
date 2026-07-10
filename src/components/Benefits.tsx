import { useState } from 'react'
import { AnimatePresence, animate as flyTo, motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Heart,
  MessageCircle,
  Palette,
  Smartphone,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { sectionMotion } from './siteData'

type BenefitCard = {
  id: string
  icon: LucideIcon
  title: string
  text: string
}

const benefitCards: BenefitCard[] = [
  {
    id: 'design',
    icon: Palette,
    title: 'Design bonito e moderno',
    text: 'Layout pensado nos mínimos detalhes, com identidade própria — nada de template genérico.',
  },
  {
    id: 'responsivo',
    icon: Smartphone,
    title: 'Responsivo em qualquer tela',
    text: 'Celular, tablet ou computador: a experiência se adapta perfeitamente em qualquer dispositivo.',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'Contato rápido pelo WhatsApp',
    text: 'Botão direto pra facilitar quem quiser falar com você, sem burocracia nenhuma.',
  },
  {
    id: 'animacoes',
    icon: Sparkles,
    title: 'Animações suaves',
    text: 'Transições fluidas em cada interação, dando vida ao site sem exagerar.',
  },
  {
    id: 'personalizado',
    icon: Heart,
    title: 'Projeto personalizado',
    text: 'Feito sob medida pra sua história, do jeitinho que combina com você.',
  },
  {
    id: 'banco',
    icon: Database,
    title: 'Banco de dados quando precisar',
    text: 'Estrutura pronta pra crescer: dados, formulários e integrações quando fizer sentido.',
  },
  {
    id: 'rapido',
    icon: Zap,
    title: 'Site rápido e organizado',
    text: 'Carregamento ágil e código limpo, sem enrolação — só o essencial bem feito.',
  },
]

const STACK_VISIBLE = 3
const SWIPE_THRESHOLD = 90
const SWIPE_VELOCITY = 500

function BenefitStack() {
  const [order, setOrder] = useState(benefitCards)
  const [frontExitId, setFrontExitId] = useState<string | null>(null)
  const [exitSign, setExitSign] = useState<1 | -1>(1)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-14, 14])

  function commitCycle(direction: 1 | -1, exitingId?: string, sign: 1 | -1 = 1) {
    setOrder((current) => {
      const next = [...current]
      if (direction === 1) {
        const [first] = next.splice(0, 1)
        next.push(first)
      } else {
        const last = next.pop()
        if (last) next.unshift(last)
      }
      return next
    })

    if (exitingId) {
      setExitSign(sign)
      setFrontExitId(exitingId)
      window.setTimeout(() => {
        setFrontExitId(null)
        x.set(0)
      }, 380)
    } else {
      x.set(0)
    }
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > SWIPE_VELOCITY) {
      const sign = info.offset.x < 0 ? -1 : 1
      commitCycle(1, order[0].id, sign)
    } else {
      flyTo(x, 0, { type: 'spring', stiffness: 420, damping: 32 })
    }
  }

  const visible = order.slice(0, STACK_VISIBLE)

  return (
    <div>
      <div className="relative h-72 w-full sm:h-64" style={{ perspective: 1000 }}>
        <AnimatePresence initial={false}>
          {visible.map((card, index) => {
            const isTop = index === 0
            const isFrontExiting = card.id === frontExitId
            const Icon = card.icon

            return (
              <motion.div
                key={card.id}
                className={`absolute inset-0 flex flex-col justify-center gap-3 rounded-[28px] border border-rose-100 bg-white px-7 py-6 shadow-xl shadow-rose-950/10 ${
                  isTop ? 'cursor-grab touch-none active:cursor-grabbing' : ''
                }`}
                style={isTop ? { x, rotate } : undefined}
                initial={{ scale: 0.8, y: 48, opacity: 0 }}
                animate={{
                  scale: 1 - index * 0.055,
                  y: index * 16,
                  opacity: 1 - index * 0.22,
                  zIndex: STACK_VISIBLE - index,
                }}
                exit={
                  isFrontExiting
                    ? { x: exitSign * 420, rotate: exitSign * 18, opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } }
                    : { scale: 0.68, y: 72, opacity: 0, transition: { duration: 0.3 } }
                }
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                drag={isTop ? 'x' : false}
                dragElastic={0.7}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                whileTap={isTop ? { cursor: 'grabbing' } : undefined}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-800">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-zinc-950">{card.title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{card.text}</p>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          aria-label="Anterior"
          className="grid h-10 w-10 place-items-center rounded-full border border-rose-100 bg-white text-rose-900 shadow-sm transition hover:bg-rose-50 active:scale-90"
          onClick={() => commitCycle(-1)}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-zinc-500">Arraste os cards pros lados</span>
        <button
          aria-label="Próximo"
          className="grid h-10 w-10 place-items-center rounded-full border border-rose-100 bg-white text-rose-900 shadow-sm transition hover:bg-rose-50 active:scale-90"
          onClick={() => commitCycle(1, order[0].id, 1)}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function Benefits() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_90%,rgba(255,214,224,0.4),transparent_35%)]" />

      <motion.div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center" {...sectionMotion}>
        <div>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-rose-800">Feito para você</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
            Da sua ideia até um link pronto para compartilhar
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            Você não precisa entender de tecnologia. Basta contar a ocasião, enviar o conteúdo e escolher o estilo. Eu cuido de transformar tudo em uma página especial.
          </p>
        </div>

        <BenefitStack />
      </motion.div>
    </section>
  )
}
