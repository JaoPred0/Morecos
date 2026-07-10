import type { MotionProps } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Gem,
  Heart,
  MonitorSmartphone,
  PanelsTopLeft,
  ShoppingBag,
  Sparkles,
  UserRound,
} from 'lucide-react'
import type { Review } from '../firebase'

export const whatsappUrl = 'https://wa.me/5567996610494'

export const sectionMotion = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
} satisfies MotionProps

export const navItems = [
  ['Como funciona', '#servicos'],
  ['Planos', '#planos'],
  ['Ideias', '#exemplos'],
  ['Avaliações', '#avaliacoes'],
  ['Contato', '#contato'],
]

export type IconCard = {
  title: string
  text: string
  icon: LucideIcon
}

export type Service = IconCard & {
  details?: string[]
}

export const services: Service[] = [
  {
    title: 'Site romântico',
    text: 'Para contar a história do casal, fazer uma surpresa ou celebrar uma data especial.',
    icon: Heart,
    details: ['Fotos e mensagens do casal', 'Linha do tempo da história', 'Contagem para uma data especial'],
  },
  {
    title: 'Site de amizade',
    text: 'Uma página para homenagear aquela amizade que merece ser lembrada para sempre.',
    icon: UserRound,
    details: ['Galeria de momentos', 'Mensagens e lembranças', 'Visual com a personalidade de vocês'],
  },
  {
    title: 'Aniversário e homenagem',
    text: 'Transforme fotos e mensagens em um presente digital emocionante e fácil de compartilhar.',
    icon: Gem,
    details: ['Texto especial', 'Fotos marcantes', 'Link exclusivo para enviar de presente'],
  },
  {
    title: 'Convite e evento',
    text: 'Convites digitais para aniversários, casamentos, encontros e outras comemorações.',
    icon: PanelsTopLeft,
    details: ['Data, horário e localização', 'Contagem regressiva', 'Confirmação de presença quando necessário'],
  },
  {
    title: 'Página pessoal',
    text: 'Um espaço bonito para apresentar sua história, projeto, talento ou marca pessoal.',
    icon: MonitorSmartphone,
    details: ['Apresentação personalizada', 'Links e redes sociais', 'Contato direto pelo WhatsApp'],
  },
  {
    title: 'Sua própria ideia',
    text: 'Tem algo diferente em mente? Conte a ideia e eu preparo um site sob medida para você.',
    icon: Sparkles,
    details: ['Conversa para entender sua ideia', 'Visual criado para a ocasião', 'Orçamento personalizado'],
  },
]

export const plans = [
  {
    name: 'Plano Basico',
    fit: 'Ideal para landing page simples',
    price: 'A combinar',
    features: ['Pagina unica', 'Responsivo', 'Botao WhatsApp', 'Design bonito'],
  },
  {
    name: 'Plano Profissional',
    fit: 'Ideal para site completo',
    price: 'A combinar',
    featured: true,
    features: [
      'Varias secoes',
      'Animacoes suaves',
      'Avaliacoes',
      'Integracao Firebase',
      'Visual premium',
    ],
  },
  {
    name: 'Plano Mensal',
    fit: 'Ideal para manutencao e melhorias',
    price: 'Mensal',
    features: ['Ajustes', 'Atualizacoes', 'Melhorias no design', 'Suporte'],
  },
  {
    name: 'Plano Personalizado',
    fit: 'Para sistemas maiores',
    price: 'Orcamento personalizado',
    features: ['Banco de dados', 'Login', 'Painel administrativo', 'Dashboards'],
  },
]

export const benefits = [
  'Design bonito e moderno',
  'Responsivo em todos os dispositivos',
  'Contato rapido pelo WhatsApp',
  'Animacoes suaves',
  'Projeto personalizado',
  'Possibilidade de banco de dados',
  'Site rapido e organizado',
]

export const examples: IconCard[] = [
  {
    title: 'Site romantico',
    text: 'Pagina delicada para casal, surpresa, pedido ou historia especial.',
    icon: Heart,
  },
  {
    title: 'Landing page profissional',
    text: 'Apresentacao direta para servicos, campanhas e captacao de clientes.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Sistema com dashboard',
    text: 'Paineis internos com dados, cadastros e acompanhamento visual.',
    icon: BarChart3,
  },
  {
    title: 'Loja online',
    text: 'Vitrine elegante para produtos com chamada rapida pelo WhatsApp.',
    icon: ShoppingBag,
  },
  {
    title: 'Pagina de apresentacao',
    text: 'Perfil digital para ideias, eventos, negocios ou projetos autorais.',
    icon: Gem,
  },
]

export const fallbackReviews: Review[] = [
  {
    id: 'demo-1',
    name: 'Marina A.',
    rating: 5,
    comment: 'Meu site ficou delicado, rapido e com uma aparencia muito profissional.',
  },
  {
    id: 'demo-2',
    name: 'Lucas R.',
    rating: 5,
    comment: 'Transformou uma ideia simples em uma pagina clara, bonita e pronta para vender.',
  },
  {
    id: 'demo-3',
    name: 'Camila S.',
    rating: 5,
    comment: 'Gostei muito do cuidado com responsividade, cores e detalhes das animacoes.',
  },
]
