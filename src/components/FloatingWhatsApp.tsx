import { whatsappUrl } from './siteData'

export function FloatingWhatsApp() {
  return (
    <a aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-900/25 transition hover:scale-105" href={whatsappUrl} rel="noreferrer" target="_blank">
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.2 18.9 6.1 16A7.3 7.3 0 1 1 8 17.8l-2.8 1.1Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M9.3 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.3c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3-.1.5.4.8 1 1.5 1.8 1.9.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.7-.1l1.4.7c.3.1.4.3.4.6 0 .6-.4 1.3-.9 1.6-.5.3-1.6.3-3-.3-2.5-1.1-4.1-3.2-4.5-4.8-.3-1 0-1.6.3-1.9Z"
          fill="currentColor"
        />
      </svg>
    </a>
  )
}
