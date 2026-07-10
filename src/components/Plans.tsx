import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Flame } from 'lucide-react'
import { sectionMotion } from './siteData'

type PricingItem = {
  name: string
  fit: string
  price: string
  period?: string
  badge?: 'Mais escolhido' | 'Premium'
  features: string[]
}

type PricingTab = {
  id: string
  label: string
  intro: string
  items: PricingItem[]
}

const tabOrder = ['servicos', 'prontos', 'planos']

const pricingTabs = ([
  {
    id: 'planos',
    label: 'Planos',
    intro: 'Durante a assinatura, você pode pedir sites, páginas, alterações e melhorias sempre que precisar, sem pagar novamente por cada pedido. Escolha o limite de projetos ideal para você.',
    items: [
      {
        name: 'Essencial',
        fit: 'Para cuidar dos seus primeiros projetos sem pagar novamente a cada alteração.',
        price: 'R$ 199',
        period: 'mês',
        features: [
          'Até 10 sites ativos',
          'Pedidos ilimitados durante o mês',
          'Criação de sites e landing pages',
          'Alterações sempre que precisar',
          'Você escolhe o visual e o conteúdo',
          'Um pedido desenvolvido por vez',
          'Hospedagem, manutenção e suporte',
        ],
      },
      {
        name: 'Em Crescimento',
        fit: 'Para quem tem mais ideias e quer liberdade para criar e melhorar diferentes projetos.',
        price: 'R$ 399',
        period: 'mês',
        badge: 'Mais escolhido',
        features: [
          'Até 15 sites ativos',
          'Pedidos ilimitados durante o mês',
          'Sites, páginas e novas seções',
          'Design e melhores animações personalizados',
          'Formulários e integrações',
          'Você explica o que quer e como deve ser',
          'Até dois pedidos desenvolvidos por vez',
          'Hospedagem, manutenção e suporte',
        ],
      },
      {
        name: 'Muitos Projetos',
        fit: 'Para quem administra várias ideias, clientes ou negócios e precisa criar com frequência.',
        price: 'R$ 799',
        period: 'mês',
        features: [
          'Até 30 sites ativos',
          'Pedidos ilimitados durante o mês',
          'Criação e reformulação de sites',
          'Lojas, portfólios e páginas especiais',
          'Novas funcionalidades e integrações',
          'Alterações sem cobrança individual',
          'Até três pedidos desenvolvidos por vez',
          'Atendimento prioritário',
        ],
      },
      {
        name: 'Sem Limites',
        fit: 'Para agências e equipes que precisam de liberdade total para pedir, criar e evoluir.',
        price: 'R$ 1.499',
        period: 'mês',
        badge: 'Premium',
        features: [
          'Sites ativos ilimitados',
          'Pedidos ilimitados durante o mês',
          'Sites, sistemas, lojas e dashboards',
          'Criação de novos projetos',
          'Alterações e melhorias contínuas',
          'Você define o que precisa e como deseja',
          'Até quatro pedidos desenvolvidos por vez',
          'Suporte e acompanhamento prioritários',
        ],
      },
    ],
  },
  {
    id: 'servicos',
    label: 'Surpresas',
    intro: 'Escolha uma opção e diga como deseja o site. Cada nível aumenta a quantidade de páginas, formulários, interações e animações disponíveis.',
    items: [
      {
        name: 'Surpresa Simples',
        fit: 'Um site bonito, direto e personalizado para apresentar sua ideia.',
        price: 'R$ 30',
        features: [
          'Site de página única',
          'Até 5 seções',
          'Visual personalizado',
          'Animações suaves',
          'Botões e links interativos',
          'Perfeito para celular e computador',
        ],
      },
      {
        name: 'Momento Especial',
        fit: 'Mais espaço, movimento e interação para criar uma experiência marcante.',
        price: 'R$ 50',
        badge: 'Mais escolhido',
        features: [
          'Tudo da Surpresa Simples',
          'Até 3 páginas',
          'Formulário personalizado',
          'Galeria ou carrossel interativo',
          'Várias animações e transições',
          'Música ou vídeo integrado',
        ],
      },
      {
        name: 'História Completa',
        fit: 'Um site completo, com liberdade para criar páginas e experiências diferentes.',
        price: 'R$ 80',
        features: [
          'Tudo do Momento Especial',
          'Até 5 páginas',
          'Formulários e interações avançadas',
          'Animações exclusivas em várias seções',
          'Contagem regressiva ou linha do tempo',
          'Recursos personalizados para sua ideia',
        ],
      },
      {
        name: 'Outra Forma',
        fit: 'Para transformar letras de músicas, dedicatórias ou uma ideia diferente em uma página criativa.',
        price: 'A combinar',
        features: [
          'Estrutura criada para sua ideia',
          'Letras de músicas e dedicatórias',
          'Modo difente de criação',
          'Estilos de sites e páginas variados',
          'Alguns dos outros 3',
        ],
      },
    ],
  },
  {
    id: 'prontos',
    label: 'Modelos',
    intro: 'Escolha um site que já está pronto e diga o que deseja mudar. Quanto maior o plano, mais liberdade você tem para personalizar e adicionar recursos.',
    items: [
      {
        name: 'Site Pronto',
        fit: 'Escolha um modelo pronto e faça somente as mudanças essenciais.',
        price: 'R$ 15',
        features: [
          'Escolha de um modelo disponível',
          'Alteração dos textos',
          'Troca de cores principais',
          'Ajuste de botões e links',
          'Pequenas mudanças no conteúdo',
          'Entrega rápida',
        ],
      },
      {
        name: 'Site do Seu Jeito',
        fit: 'Use um modelo como base e transforme o visual para combinar com a sua ideia.',
        price: 'R$ 25',
        badge: 'Mais escolhido',
        features: [
          'Tudo do Site Pronto',
          'Grandes mudanças no visual',
          'Troca de seções e organização',
          'Novas cores, fontes e estilos',
          'Animações personalizadas',
          'Formulário ou galeria',
        ],
      },
      {
        name: 'Site Mais Completo',
        fit: 'Personalize o modelo e acrescente novas partes, interações e funcionalidades.',
        price: 'R$ 45',
        features: [
          'Tudo do Site do Seu Jeito',
          'Novas páginas ou seções',
          'Mais animações e interações',
          'Música ou vídeo integrado',
          'Formulários personalizados',
          'Recursos adicionais para sua ideia',
        ],
      },
    ],
  },
] satisfies PricingTab[]).sort((a, b) => tabOrder.indexOf(a.id) - tabOrder.indexOf(b.id))

function PricingCard({ item }: { item: PricingItem }) {
  const isBestseller = item.badge === 'Mais escolhido'
  const isPremium = item.badge === 'Premium'
  const isFeatured = isPremium || isBestseller

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative mt-4 flex w-[74vw] max-w-[18rem] shrink-0 snap-center flex-col rounded-3xl border p-5 pt-7 transition-shadow duration-500 sm:w-auto sm:min-w-[19rem] sm:max-w-none sm:snap-start sm:p-6 sm:pt-8 md:min-w-0 ${
        isFeatured
          ? 'border-rose-300/70 bg-white text-zinc-950 shadow-[0_24px_60px_-20px_rgba(244,63,94,0.35)]'
          : 'border-white/10 bg-white/[0.04] text-white hover:border-white/20'
      }`}
    >
      {isBestseller ? (
        <motion.span
          className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-rose-900/40"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Flame className="h-3 w-3" />
          Mais escolhido
        </motion.span>
      ) : isPremium ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-zinc-950 px-4 py-1.5 text-xs font-bold text-white">
          Premium
        </span>
      ) : null}

      <h3 className="text-lg font-semibold sm:text-xl">{item.name}</h3>
      <p className={`mt-2 text-xs leading-5 sm:text-sm ${isFeatured ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.fit}</p>

      <div className="mt-5 flex items-baseline gap-1.5 sm:mt-6">
        <p className="text-2xl font-semibold sm:text-3xl">{item.price}</p>
        {item.period ? (
          <span className={`text-sm ${isFeatured ? 'text-zinc-500' : 'text-zinc-400'}`}>/{item.period}</span>
        ) : null}
      </div>

      <span className={`mt-5 block h-px w-full ${isFeatured ? 'bg-zinc-200' : 'bg-white/10'}`} />

      <ul className="mt-4 flex-1 space-y-2.5 sm:mt-5 sm:space-y-3">
        {item.features.map((feature) => (
          <li className="flex items-center gap-2.5 text-xs leading-5 sm:gap-3 sm:text-sm" key={feature}>
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                isFeatured ? 'bg-rose-100 text-rose-700' : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              <Check className="h-3 w-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        className={`mt-6 inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:mt-7 sm:px-5 sm:py-3 ${
          isFeatured
            ? 'bg-rose-950 text-white shadow-lg shadow-rose-900/20 hover:bg-rose-900'
            : 'bg-white/10 text-white hover:bg-white/15'
        }`}
        href="#contato"
      >
        Quero esse
      </a>
    </motion.article>
  )
}

export function Plans() {
  const [activeTab, setActiveTab] = useState(pricingTabs[0].id)
  const current = pricingTabs.find((tab) => tab.id === activeTab) ?? pricingTabs[0]
  const desktopGridClass = current.items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <section className="relative overflow-hidden bg-zinc-950 px-4 py-24 text-white sm:px-6 lg:px-8" id="planos">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,rgba(244,63,94,0.18),transparent_35%),radial-gradient(circle_at_85%_100%,rgba(244,63,94,0.12),transparent_35%)]" />

      <motion.div className="mx-auto max-w-7xl" {...sectionMotion}>
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-rose-300">Investimento</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            Escolha como quer tirar sua ideia do papel
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">{current.intro}</p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {pricingTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-zinc-950' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {activeTab === tab.id ? (
                  <motion.span
                    layoutId="pricing-tab-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-5 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 ${desktopGridClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current.items.map((item) => (
              <PricingCard item={item} key={item.name} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
