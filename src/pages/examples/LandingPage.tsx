import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Radio } from 'lucide-react'

const RECURSOS = [
  { titulo: 'Carrega em menos de 1 segundo', desc: 'Ninguém espera — sua página abre na hora, em qualquer conexão.' },
  { titulo: 'Aparece no Google', desc: 'Estruturada para os buscadores encontrarem seu negócio.' },
  { titulo: 'Contatos direto no WhatsApp', desc: 'Cada formulário preenchido cai no seu número, sem painel extra.' },
  { titulo: 'Perfeita em qualquer tela', desc: 'Do celular do cliente ao notebook da equipe.' },
]

const DIAS = ['S', 'T', 'Q', 'Q', 'S', 'S']
const CONVERSOES_SEMANA = [35, 55, 42, 78, 65, 100]

const SINAIS = [
  'Novo contato — Ana R. · agora',
  'Novo contato — Studio Fit · há 2 min',
  'Novo contato — Barbearia Nunes · há 5 min',
  'Novo contato — Doce Ponto Café · há 9 min',
]

const ESTATISTICAS = [
  { valor: '200+', rotulo: 'negócios ativos' },
  { valor: '4.8', rotulo: 'nota média' },
  { valor: '48h', rotulo: 'do zero ao ar' },
]

export function LandingPage() {
  const [sinalAtivo, setSinalAtivo] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSinalAtivo((v) => (v + 1) % SINAIS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="min-h-screen bg-[#120b1f] text-[#f5f0ff] [font-family:'Space_Grotesk',ui-sans-serif,system-ui]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        @keyframes travel {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.55; }
          100% { transform: scale(2); opacity: 0; }
        }
        .signal-dot {
          offset-path: path('M6,46 Q125,2 244,46');
          offset-rotate: 0deg;
          animation: travel 3.2s ease-in-out infinite;
        }
        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-dot { animation: none; offset-distance: 50%; opacity: 1; }
          .pulse-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <b className="text-xl tracking-tight">
          NEXA<span className="text-[#ff5f7e]">.</span>
        </b>
        <div className="hidden gap-8 text-sm text-[#a99fc2] sm:flex">
          <a href="#recursos" className="transition hover:text-[#f5f0ff]">Recursos</a>
          <a href="#resultado" className="transition hover:text-[#f5f0ff]">Resultados</a>
        </div>
        <a
          href="/#exemplos"
          className="rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/30"
        >
          Voltar
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ff5f7e]/10 px-3 py-1.5 text-sm text-[#ff5f7e]">
            <Radio className="h-4 w-4" /> Sinal de crescimento
          </span>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Toda visita é um sinal de que alguém quase virou cliente.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#a99fc2]">
            A NEXA transforma esse sinal em contato de verdade: uma página que apresenta
            seu negócio, passa confiança e leva o cliente direto até você.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#ff5f7e] px-6 py-3.5 font-semibold text-[#120b1f] transition hover:bg-[#ff7d94]">
              Criar minha página <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#resultado" className="text-sm text-[#a99fc2] underline decoration-white/20 underline-offset-4 transition hover:text-[#f5f0ff]">
              Ver o sinal em tempo real
            </a>
          </div>

          <dl className="mt-14 flex gap-10 border-t border-white/10 pt-8">
            {ESTATISTICAS.map((e) => (
              <div key={e.rotulo}>
                <dt className="mono text-2xl font-medium">{e.valor}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-[#a99fc2]">{e.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="resultado" className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-[#ff5f7e]/10">
          <div className="rounded-2xl border border-white/10 bg-[#1c1330] p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#a99fc2]">Sinal ao vivo</p>
              <span className="flex items-center gap-1.5 mono text-xs text-[#ff5f7e]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5f7e]" /> AO VIVO
              </span>
            </div>

            <strong className="mono mt-3 block text-5xl font-medium">
              +184<span className="text-[#d4ff5f]">%</span>
            </strong>
            <p className="mt-1 text-sm text-[#a99fc2]">conversões este mês</p>

            {/* sinal de conversão — visita se tornando cliente */}
            <div className="relative mt-8 h-16">
              <svg viewBox="0 0 250 60" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                <path d="M6,46 Q125,2 244,46" fill="none" stroke="rgba(245,240,255,0.15)" strokeWidth="1.5" strokeDasharray="1 6" strokeLinecap="round" />
              </svg>
              <span className="absolute h-2 w-2 rounded-full bg-[#ff5f7e] signal-dot" />
              <span className="pulse-ring absolute right-[6px] top-[42px] h-2 w-2 -translate-y-1/2 rounded-full bg-[#ff5f7e]" />
              <span className="absolute bottom-0 left-0 mono text-[10px] text-[#a99fc2]">visita</span>
              <span className="absolute bottom-0 right-0 mono text-[10px] text-[#d4ff5f]">cliente</span>
            </div>

            <div className="mt-5 flex h-24 items-end gap-2">
              {CONVERSOES_SEMANA.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className="w-full rounded-t bg-gradient-to-t from-[#ff5f7e]/40 to-[#ff5f7e]"
                    style={{ height: `${h * 0.6}px` }}
                  />
                  <span className="mono text-[10px] text-[#a99fc2]">{DIAS[i]}</span>
                </div>
              ))}
            </div>

            <div
              key={sinalAtivo}
              className="mono mt-5 truncate rounded-lg bg-black/20 px-3 py-2 text-xs text-[#d4ff5f]"
            >
              {SINAIS[sinalAtivo]}
            </div>
          </div>

          <div id="recursos" className="grid gap-4 pt-6 sm:grid-cols-2">
            {RECURSOS.map((r) => (
              <div key={r.titulo} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4ff5f]" />
                <div>
                  <p className="text-sm font-medium">{r.titulo}</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#a99fc2]">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}