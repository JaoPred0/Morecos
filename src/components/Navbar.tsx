import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'
import { navItems, whatsappUrl } from './siteData'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out motion-reduce:transition-none ${
        scrolled
          ? 'border-white/60 bg-white/80 shadow-lg shadow-zinc-900/5 backdrop-blur-xl'
          : 'border-transparent bg-white/40 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a className="group flex items-center gap-2 font-semibold text-zinc-950" href="#inicio">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white shadow-lg shadow-rose-900/15 transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:scale-105">
            <img
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
              src={logo}
            />
          </span>
          <span className="relative">
            Morecos Digital
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-rose-900 transition-all duration-300 ease-out group-hover:w-full" />
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <a
              className="group relative px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-300 hover:text-rose-950"
              href={href}
              key={href}
            >
              {label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-rose-900 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <a
          className="group relative hidden overflow-hidden rounded-full bg-rose-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-900/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-900/30 md:inline-flex"
          href={whatsappUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span className="relative z-10">Falar no WhatsApp</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </a>

        <button
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-rose-100 bg-white text-rose-950 transition-transform duration-300 ease-out active:scale-90 md:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-300 ease-out ${
              open ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute h-5 w-5 transition-all duration-300 ease-out ${
              open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </button>
      </nav>

      <div
        className={`grid overflow-hidden border-t border-rose-100 bg-white/95 backdrop-blur-xl transition-all duration-[400ms] ease-out motion-reduce:transition-none md:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {navItems.map(([label, href], index) => (
              <a
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors duration-300 ease-out hover:bg-rose-50 hover:text-rose-950"
                href={href}
                key={href}
                onClick={() => setOpen(false)}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '350ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: open ? `${index * 40}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {label}
              </a>
            ))}

            <a
              className="mt-2 inline-flex items-center justify-center rounded-full bg-rose-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/20 transition-transform duration-300 ease-out active:scale-95"
              href={whatsappUrl}
              onClick={() => setOpen(false)}
              rel="noreferrer"
              target="_blank"
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '350ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: open ? `${navItems.length * 40}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(-8px)',
              }}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
