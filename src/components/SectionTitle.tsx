type SectionTitleProps = {
  eyebrow: string
  title: string
  text: string
}

export function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <span className="text-sm font-bold uppercase tracking-[0.18em] text-rose-800">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-zinc-600">{text}</p>
    </div>
  )
}
