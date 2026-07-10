import { motion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import logo from '../assets/logo.png'
import { navItems, whatsappUrl } from './siteData'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rose-100 bg-white px-4 text-sm text-zinc-600 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <a className="group inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-rose-950" href="#topo">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-rose-100 bg-white shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <img
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                  src={logo}
                />
              </span>
              <span>Morecos Digital</span>
            </a>
            <p className="mt-3 leading-6 text-zinc-500">
              Sites personalizados para casais, amizades, homenagens, eventos e histórias especiais.
            </p>

            <a
              aria-label="Falar no WhatsApp"
              className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-rose-950 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-900/15 transition hover:bg-rose-900"
              href={whatsappUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover:rotate-[-8deg]" />
              Falar no WhatsApp
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-rose-950/50">
              Navegacao
            </p>
            <nav aria-label="Links do rodape" className="flex flex-col gap-3">
              {navItems.map(([label, href]) => (
                <a className="w-fit font-medium text-zinc-600 transition hover:text-rose-700" href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-rose-950/50">
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <a
                className="inline-flex w-fit items-center gap-2 font-medium text-zinc-600 transition hover:text-rose-700"
                href={whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              {/* <a
                className="inline-flex w-fit items-center gap-2 font-medium text-zinc-600 transition hover:text-rose-700"
                href="mailto:contato@morecosdigital.com"
              >
                <Mail className="h-4 w-4" />
                E-mail
              </a>
              <a
                className="inline-flex w-fit items-center gap-2 font-medium text-zinc-600 transition hover:text-rose-700"
                href="#"
                rel="noreferrer"
                target="_blank"
              >
                <Camera className="h-4 w-4" />
                Instagram
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-rose-100 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-400">© {year} Morecos Digital. Todos os direitos reservados.</p>

          <motion.a
            aria-label="Voltar ao topo"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rose-100 text-rose-950 transition hover:bg-rose-50"
            href="#topo"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
