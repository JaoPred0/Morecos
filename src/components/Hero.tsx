import { motion } from 'framer-motion'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import heroImage from '../assets/romantic-digital-hero.png'
import { AnimatedHeroDecor } from './AnimatedHeroDecor'

function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')

  return (
    <h1 className={className} style={{ perspective: 800 }}>
      {words.map((word, index) => (
        <motion.span
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          className="inline-block"
          initial={{ opacity: 0, y: 28, rotateX: -50 }}
          key={`${word}-${index}`}
          transition={{
            duration: 0.7,
            delay: 0.2 + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h1>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8" id="inicio">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,205,218,0.9),transparent_28%),linear-gradient(135deg,#fff8fa_0%,#ffffff_42%,#fbe7ed_100%)]" />
      <AnimatedHeroDecor />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
        <div>
          <motion.span
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-sm font-semibold text-rose-900 shadow-sm"
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="h-4 w-4 fill-rose-600 text-rose-600" />
            </motion.span>
            Sites personalizados para pessoas e momentos especiais
          </motion.span>

          <AnimatedHeading
            className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl lg:text-6xl"
            text="Sua história merece um site só dela."
          />

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Eu crio páginas personalizadas para casais, amizades, homenagens, aniversários,
            eventos e outras ideias especiais. Você me conta o que deseja e eu transformo
            fotos, mensagens e lembranças em um site bonito para compartilhar.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            <a
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-950 px-6 py-4 font-semibold text-white shadow-xl shadow-rose-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-900 hover:shadow-2xl hover:shadow-rose-900/30"
              href="#servicos"
            >
              <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Ver como funciona
            </a>
            <a
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-white/80 px-6 py-4 font-semibold text-rose-950 transition-all duration-300 hover:border-rose-300 hover:bg-white"
              href="#planos"
            >
              Conhecer os planos
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="relative"
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            alt="Exemplo de um site romântico personalizado criado pela Morecos Digital"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-rose-950/20"
            src={heroImage}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
          />
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-5 left-5 right-5 rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-rose-950/10 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-950">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-950">Você imagina. Eu crio.</p>
                <p className="text-sm text-zinc-600">Um site único, feito para a sua história.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
