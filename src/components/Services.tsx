import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion'
import { sectionMotion, services, type Service } from './siteData'
import { SectionTitle } from './SectionTitle'
import { X } from 'lucide-react'

const CARD_TILT = [-2, 1.5, -1, 2, -1.5, 1]
const CLOSE_OFFSET = 120
const CLOSE_VELOCITY = 500
const DESKTOP_QUERY = '(min-width: 768px)'

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

function ServiceSheet({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const isDesktop = useIsDesktop()
  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 380, damping: 36 })

  useEffect(() => {
    y.set(0)
    document.body.style.overflow = service ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [service, y])

  useEffect(() => {
    if (!service) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [service, onClose])

  function handlePan(_: unknown, info: PanInfo) {
    const next = y.get() + info.delta.y
    y.set(next < 0 ? next * 0.15 : next) // resistência leve pra cima
  }

  function handlePanEnd(_: unknown, info: PanInfo) {
    if (y.get() > CLOSE_OFFSET || info.velocity.y > CLOSE_VELOCITY) {
      onClose()
    } else {
      y.set(0)
    }
  }

  const content = service ? (
    <>
      <motion.div
        className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-900 text-white shadow-lg shadow-rose-900/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <service.icon className="h-7 w-7" />
      </motion.div>

      <h3 className="mt-5 text-2xl font-semibold text-zinc-950">{service.title}</h3>
      <p className="mt-3 text-base leading-7 text-zinc-600">{service.text}</p>

      {service.details ? (
        <ul className="mt-6 space-y-3">
          {service.details.map((detail, index) => (
            <motion.li
              key={detail}
              className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.06, duration: 0.35 }}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              {detail}
            </motion.li>
          ))}
        </ul>
      ) : null}
    </>
  ) : null

  return (
    <AnimatePresence>
      {service ? (
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
            // Tablet / PC — modal centralizado
            <div className="fixed inset-0 z-[70] grid place-items-center p-6">
              <motion.div
                key="modal"
                className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-[32px] border border-rose-100 bg-white/95 p-8 shadow-[0_30px_80px_-24px_rgba(159,18,57,0.4)] backdrop-blur-xl"
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
            // Mobile — bottom sheet com handle, sem botão de X
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

              <div className="max-h-[calc(85vh-32px)] overflow-y-auto overscroll-contain px-6 pb-10 pt-1 sm:px-8">
                {content}
              </div>
            </motion.div>
          )}
        </>
      ) : null}
    </AnimatePresence>
  )
}

export function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8" id="servicos">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,rgba(255,214,224,0.45),transparent_38%)]" />

      <motion.div className="mx-auto max-w-7xl" {...sectionMotion}>
        <SectionTitle
          eyebrow="Como funciona"
          text="Escolha uma ideia ou conte a sua. Você envia as fotos, os textos e o estilo que imagina; eu cuido da criação e entrego um link pronto para compartilhar. Clique nos cards para conhecer as possibilidades."
          title="Você conta a história. Eu transformo em site."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const tilt = CARD_TILT[index % CARD_TILT.length]
            return (
              <motion.article
                key={service.title}
                className="group relative cursor-pointer rounded-[28px] border border-rose-100/80 bg-[#fffaf9] p-7 text-left shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_40px_-24px_rgba(159,18,57,0.25)] transition-shadow duration-500 ease-out hover:shadow-[0_28px_60px_-24px_rgba(159,18,57,0.35)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                whileHover={{ rotate: 0, scale: 1.02, y: -6 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(service)}
              >
                <span className="absolute -top-2.5 left-8 h-5 w-14 -rotate-3 rounded-sm bg-rose-200/70 shadow-sm transition-transform duration-500 group-hover:-rotate-1" />

                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-800 transition-colors duration-500 ease-out group-hover:bg-rose-900 group-hover:text-white">
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-zinc-950">{service.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{service.text}</p>

                <span className="mt-5 block h-px w-10 origin-left bg-rose-200 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-rose-300" />
              </motion.article>
            )
          })}
        </div>
      </motion.div>

      <ServiceSheet service={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
