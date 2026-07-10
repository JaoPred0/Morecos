import { useEffect, useState, type FormEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useSpring,
  type PanInfo,
} from 'framer-motion'
import { Check, Send, Share2, Star, X } from 'lucide-react'
import { addReview, getReviews, type Review } from '../firebase'
import { SectionTitle } from './SectionTitle'
import { sectionMotion } from './siteData'

export const fallbackReviews: Review[] = [
  {
    id: 'demo-1',
    name: 'Marina A.',
    rating: 5,
    comment: 'Meu site ficou delicado, rápido e com uma aparência muito profissional.',
  },
  {
    id: 'demo-2',
    name: 'Lucas R.',
    rating: 5,
    comment: 'Transformou uma ideia simples em uma página clara, bonita e pronta para vender.',
  },
  {
    id: 'demo-3',
    name: 'Camila S.',
    rating: 5,
    comment: 'Gostei muito do cuidado com responsividade, cores e detalhes das animações.',
  },
  {
    id: 'demo-4',
    name: 'Rafael P.',
    rating: 5,
    comment: 'Atendimento rápido e o resultado ficou muito acima do que eu esperava.',
  },
  {
    id: 'demo-5',
    name: 'Beatriz L.',
    rating: 4,
    comment: 'Design lindo, só demorou um pouquinho mais que o combinado, mas valeu a pena.',
  },
  {
    id: 'demo-6',
    name: 'Thiago M.',
    rating: 5,
  },
  {
    id: 'demo-7',
    name: 'Juliana K.',
    rating: 5,
    comment: 'Recomendo demais, ficou exatamente do jeito que eu tinha em mente.',
  },
  {
    id: 'demo-8',
    name: 'Pedro H.',
    rating: 5,
    comment: 'Muito profissional do início ao fim, o site converteu bem melhor que o antigo.',
  },
]

const DESKTOP_QUERY = '(min-width: 768px)'
const CLOSE_OFFSET = 120
const CLOSE_VELOCITY = 500
const SECONDS_PER_CARD = 4.5

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

function StarPicker({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const activeValue = hovered ?? value

  return (
    <div className="flex items-center gap-1.5" onMouseLeave={() => setHovered(null)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
          className="p-0.5"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          type="button"
          whileTap={{ scale: 0.85 }}
        >
          <motion.div animate={{ scale: activeValue >= star ? 1.1 : 1 }} transition={{ duration: 0.15 }}>
            <Star
              className={`h-7 w-7 transition-colors duration-150 ${
                activeValue >= star ? 'fill-rose-500 text-rose-500' : 'fill-transparent text-zinc-300'
              }`}
            />
          </motion.div>
        </motion.button>
      ))}
    </div>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          className={`h-4 w-4 ${star <= rating ? 'fill-rose-500 text-rose-500' : 'fill-transparent text-zinc-300'}`}
          key={star}
        />
      ))}
    </div>
  )
}

function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareData = {
      title: document.title,
      text: 'Dá uma olhada nesse site, achei incrível.',
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // usuário cancelou o share sheet, sem problema
      }
      return
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard indisponível, ignora silenciosamente
    }
  }

  return (
    <motion.button
      className="relative inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-950 shadow-sm transition-colors hover:border-rose-300 hover:bg-rose-50"
      onClick={handleShare}
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-4 w-4" />
            Link copiado
          </motion.span>
        ) : (
          <motion.span
            key="share"
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <Share2 className="h-4 w-4" />
            Compartilhar
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function ReviewCard({ review, onSelect }: { review: Review; onSelect: (review: Review) => void }) {
  return (
    <motion.article
      className="flex w-[64vw] shrink-0 cursor-pointer snap-center flex-col rounded-3xl border border-zinc-100 bg-white p-6 text-left shadow-sm shadow-rose-950/5 transition-shadow hover:shadow-lg hover:shadow-rose-950/10 sm:w-[280px]"
      onClick={() => onSelect(review)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSelect(review)
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Stars rating={review.rating} />
      {review.comment ? (
        <p className="mt-4 line-clamp-4 flex-1 leading-7 text-zinc-700">&ldquo;{review.comment}&rdquo;</p>
      ) : (
        <div className="flex-1" aria-hidden="true" />
      )}
      <p className="mt-5 font-semibold text-zinc-950">{review.name}</p>
    </motion.article>
  )
}

// Esteira infinita: a lista é duplicada e a faixa anda continuamente para a
// esquerda via CSS. Passar o mouse (ou tocar, no celular) pausa o movimento;
// clicar num card abre o modal com a avaliação completa.
function ReviewMarquee({ reviews, onSelect }: { reviews: Review[]; onSelect: (review: Review) => void }) {
  const [paused, setPaused] = useState(false)

  if (reviews.length <= 1) {
    return (
      <div className="flex justify-center px-6 py-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} onSelect={onSelect} review={review} />
        ))}
      </div>
    )
  }

  const loopReviews = [...reviews, ...reviews]
  const duration = Math.max(reviews.length * SECONDS_PER_CARD, 18)

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24" />

      <div
        className="overflow-x-auto px-[18vw] py-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:overflow-hidden sm:px-0 sm:snap-none [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex w-max gap-4"
          style={{
            animation: `reviews-marquee ${duration}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {loopReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} onSelect={onSelect} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes reviews-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

function ReviewModal({ review, onClose }: { review: Review | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {review ? (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] bg-zinc-950/50 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[88vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-rose-100 bg-white p-7 shadow-2xl shadow-rose-950/20 sm:p-8"
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <button
              aria-label="Fechar"
              className="absolute right-5 top-5 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <Stars rating={review.rating} />
            {review.comment ? (
              <p className="mt-5 pr-4 text-lg leading-8 text-zinc-700">&ldquo;{review.comment}&rdquo;</p>
            ) : null}
            <p className="mt-6 font-semibold text-zinc-950">{review.name}</p>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

function AllReviewsModal({
  reviews,
  open,
  onClose,
}: {
  reviews: Review[]
  open: boolean
  onClose: () => void
}) {
  const dragControls = useDragControls()

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] bg-zinc-950/50 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            animate={{ y: 0 }}
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-[90] mx-auto flex max-h-[88vh] max-w-4xl flex-col overflow-hidden rounded-t-[32px] border border-b-0 border-rose-100 bg-white shadow-[0_-24px_60px_-20px_rgba(159,18,57,0.35)]"
            drag="y"
            dragConstraints={{ bottom: 0, top: 0 }}
            dragControls={dragControls}
            dragElastic={{ bottom: 0.5, top: 0 }}
            dragListener={false}
            exit={{ y: '100%' }}
            initial={{ y: '100%' }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) onClose()
            }}
            role="dialog"
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div
              className="flex cursor-grab touch-none justify-center pb-2 pt-4 active:cursor-grabbing"
              onPointerDown={(event) => dragControls.start(event)}
            >
              <span className="h-1.5 w-12 rounded-full bg-rose-300/70" />
            </div>
            <div className="border-b border-rose-100 px-6 pb-5 pt-2">
              <div>
                <h3 className="text-xl font-semibold text-zinc-950">Todas as avaliações</h3>
                <p className="mt-1 text-sm text-zinc-500">{reviews.length} comentários publicados</p>
              </div>
            </div>

            <div className="grid flex-1 gap-4 overflow-y-auto p-6 sm:grid-cols-2">
              {reviews.map((review) => (
                <article className="rounded-2xl border border-rose-100 p-5" key={review.id}>
                  <Stars rating={review.rating} />
                  {review.comment ? (
                    <p className="mt-4 leading-7 text-zinc-700">&ldquo;{review.comment}&rdquo;</p>
                  ) : null}
                  <p className="mt-4 font-semibold text-zinc-950">{review.name}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

function ReviewFormFields({
  name,
  setName,
  rating,
  setRating,
  comment,
  setComment,
  sending,
  status,
  onSubmit,
}: {
  name: string
  setName: (value: string) => void
  rating: number
  setRating: (value: number) => void
  comment: string
  setComment: (value: string) => void
  sending: boolean
  status: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <label className="block text-sm font-semibold text-zinc-700" htmlFor="name">
        Nome
      </label>
      <input
        className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
        id="name"
        onChange={(event) => setName(event.target.value)}
        placeholder="Seu nome"
        value={name}
      />

      <p className="mt-5 text-sm font-semibold text-zinc-700">Sua nota</p>
      <div className="mt-2">
        <StarPicker onChange={setRating} value={rating} />
      </div>

      <label className="mt-5 block text-sm font-semibold text-zinc-700" htmlFor="comment">
        Comentário <span className="font-normal text-zinc-400">(opcional)</span>
      </label>
      <textarea
        className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-rose-100 bg-white px-4 py-3 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
        id="comment"
        maxLength={150}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Conte como ficou seu projeto, se quiser"
        value={comment}
      />
      <p className="mt-1 text-right text-xs text-zinc-400">{comment.length}/150</p>

      <button
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-950 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/20 transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={sending}
        type="submit"
      >
        <Send className="h-4 w-4" />
        {sending ? 'Enviando...' : 'Enviar avaliação'}
      </button>
      {status ? <p className="mt-3 text-sm font-medium text-rose-900">{status}</p> : null}
    </form>
  )
}

export function Reviews() {
  const isDesktop = useIsDesktop()
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [allReviewsOpen, setAllReviewsOpen] = useState(false)

  const y = useMotionValue(0)
  const springY = useSpring(y, { stiffness: 380, damping: 36 })

  useEffect(
    () =>
      getReviews((items) => {
        if (items.length > 0) {
          setReviews(items)
        }
      }),
    [],
  )

  useEffect(() => {
    y.set(0)
    document.body.style.overflow = sheetOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sheetOpen, y])

  function handlePan(_: unknown, info: PanInfo) {
    const next = y.get() + info.delta.y
    y.set(next < 0 ? next * 0.15 : next)
  }

  function handlePanEnd(_: unknown, info: PanInfo) {
    if (y.get() > CLOSE_OFFSET || info.velocity.y > CLOSE_VELOCITY) {
      setSheetOpen(false)
    } else {
      y.set(0)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('')

    if (name.trim().length < 2) {
      setStatus('Preencha seu nome pra gente saber quem é.')
      return
    }

    try {
      setSending(true)
      await addReview({
        name: name.trim(),
        rating,
        comment: comment.trim() || undefined,
      })
      setName('')
      setRating(5)
      setComment('')
      setStatus('Avaliação enviada com sucesso.')
      setTimeout(() => setSheetOpen(false), 900)
    } catch {
      setStatus('Configure o Firebase no .env para salvar avaliações reais.')
    } finally {
      setSending(false)
    }
  }

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8" id="avaliacoes">
      <motion.div
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.08, 1] }}
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-rose-100/60 blur-3xl"
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1.05, 1, 1.05] }}
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-rose-50 blur-3xl"
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div className="relative mx-auto max-w-7xl" {...sectionMotion}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Avaliações"
            text="Depoimentos reais de quem já teve seu projeto entregue, direto da nossa coleção no Firestore."
            title="Quem já passou por aqui, aprovou"
          />

          <div className="flex shrink-0 items-center gap-3">
            <motion.div
              className="flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50/60 px-4 py-2.5 text-sm font-semibold text-rose-950"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
              {averageRating}
              <span className="font-normal text-rose-900/60">· {reviews.length} avaliações</span>
            </motion.div>
            <ShareButton />
          </div>
        </div>

        {/* Formulário sempre em cima, carrossel sempre embaixo, ocupando a largura toda */}
        <div className="mt-10 flex flex-col gap-10">
          <div className="hidden rounded-3xl border border-rose-100 bg-rose-50/60 p-6 shadow-sm lg:mx-auto lg:block lg:w-full lg:max-w-2xl">
            <h3 className="text-xl font-semibold text-zinc-950">Envie sua avaliação</h3>
            <div className="mt-5">
              <ReviewFormFields
                comment={comment}
                name={name}
                onSubmit={handleSubmit}
                rating={rating}
                sending={sending}
                setComment={setComment}
                setName={setName}
                setRating={setRating}
                status={status}
              />
            </div>
          </div>

          <div className="lg:hidden">
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50/60 px-5 py-4 font-semibold text-rose-950 shadow-sm transition hover:bg-rose-50"
              onClick={() => setSheetOpen(true)}
              type="button"
            >
              <Star className="h-4 w-4 fill-rose-500 text-rose-500" />
              Deixar minha avaliação
            </button>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ReviewMarquee onSelect={setSelectedReview} reviews={reviews.slice(0, 12)} />
            <div className="mt-7 flex justify-center">
              <button
                className="rounded-full border border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-rose-950 shadow-sm transition hover:bg-rose-50"
                onClick={() => setAllReviewsOpen(true)}
                type="button"
              >
                Ver todos os comentários
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <ReviewModal onClose={() => setSelectedReview(null)} review={selectedReview} />
      <AllReviewsModal
        onClose={() => setAllReviewsOpen(false)}
        open={allReviewsOpen}
        reviews={reviews}
      />

      {!isDesktop ? (
        <AnimatePresence>
          {sheetOpen ? (
            <>
              <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[60] bg-zinc-950/45 backdrop-blur-sm"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={() => setSheetOpen(false)}
                transition={{ duration: 0.25 }}
              />
              <motion.div
                animate={{ y: 0 }}
                className="fixed inset-x-0 bottom-0 z-[70] max-h-[88vh] rounded-t-[32px] border border-rose-100 bg-white/95 shadow-[0_-24px_60px_-20px_rgba(159,18,57,0.35)] backdrop-blur-xl"
                exit={{ y: '100%' }}
                initial={{ y: '100%' }}
                style={{ y: springY }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              >
                <motion.div
                  className="flex cursor-grab touch-none justify-center pb-3 pt-3 active:cursor-grabbing"
                  onPan={handlePan}
                  onPanEnd={handlePanEnd}
                >
                  <span className="h-1.5 w-12 rounded-full bg-rose-300/70" />
                </motion.div>

                <div className="max-h-[calc(88vh-32px)] overflow-y-auto overscroll-contain px-6 pb-10 pt-1 sm:px-8">
                  <h3 className="text-xl font-semibold text-zinc-950">Envie sua avaliação</h3>
                  <div className="mt-5">
                    <ReviewFormFields
                      comment={comment}
                      name={name}
                      onSubmit={handleSubmit}
                      rating={rating}
                      sending={sending}
                      setComment={setComment}
                      setName={setName}
                      setRating={setRating}
                      status={status}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      ) : null}
    </section>
  )
}
