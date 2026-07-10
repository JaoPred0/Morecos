import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react'
import { sectionMotion, whatsappUrl } from './siteData'

export function Contact() {
  return (
    <section className="relative overflow-hidden bg-rose-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32" id="contato">
      {/* Fundo animado */}
      <div className="pointer-events-none absolute inset-0">
        {/* grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* blobs animados */}
        <motion.div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rose-500/30 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* gradiente de vinheta pra dar profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/0 via-rose-950/0 to-rose-950" />
      </div>

      <motion.div className="relative mx-auto max-w-3xl text-center text-white" {...sectionMotion}>
        <motion.span
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-rose-100 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          Encomende seu site personalizado
        </motion.span>

        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Vamos transformar sua{' '}
          <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-amber-300 bg-clip-text text-transparent">
            ideia
          </span>{' '}
          em uma página inesquecível?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-rose-100/80">
          Conte se é para seu amor, uma amizade, uma homenagem, um evento ou outra ideia. Eu explico as opções e preparo um orçamento sem compromisso.
        </p>

        <motion.a
          className="group relative mt-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 font-semibold text-rose-950 shadow-2xl shadow-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href={whatsappUrl}
          rel="noreferrer"
          target="_blank"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Falar no WhatsApp"
        >
          {/* anel de pulso */}
          <span className="absolute inset-0 -z-10 rounded-2xl bg-white/60 blur-md" />
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-white/70"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />

          <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]" />
          Contar minha ideia no WhatsApp
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.a>

        <p className="mt-5 text-sm text-rose-200/70">Resposta rápida • Orçamento sem compromisso</p>
      </motion.div>
    </section>
  )
}
