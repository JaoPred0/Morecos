import { Benefits } from './components/Benefits'
import { Contact } from './components/Contact'
import { Examples } from './components/Examples'
import { ConviteDeEventoPage } from './pages/examples/ConviteDeEventoPage'
import { LandingPage } from './pages/examples/LandingPage'
import { LetrasDeMusicaPage } from './pages/examples/LetrasDeMusicaPage'
import { NossaHistoriaPage } from './pages/examples/NossaHistoriaPage'
import { NotFoundExamplePage } from './pages/examples/NotFoundExamplePage'
import { PortfolioPage } from './pages/examples/PortfolioPage'
import { SiteDeAmizadePage } from './pages/examples/SiteDeAmizadePage'
import { SiteDeNamoroPage } from './pages/examples/SiteDeNamoroPage'
import { TimelinePage } from './pages/examples/TimelinePage'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Plans } from './components/Plans'
import { Reviews } from './components/Reviews'
import { Services } from './components/Services'

function App() {
  const exampleMatch = window.location.pathname.match(/^\/exemplo\/([^/]+)\/?$/)

  if (exampleMatch) {
    const exampleRoutes: Record<string, React.ReactNode> = {
      'site-de-namoro': <SiteDeNamoroPage />,
      'site-de-amizade': <SiteDeAmizadePage />,
      'landing-page': <LandingPage />,
      'letras-de-musica': <LetrasDeMusicaPage />,
      'convite-de-evento': <ConviteDeEventoPage />,
      timeline: <TimelinePage />,
      'nossa-historia': <NossaHistoriaPage />,
      portfolio: <PortfolioPage />,
    }
    return exampleRoutes[decodeURIComponent(exampleMatch[1])] ?? <NotFoundExamplePage />
  }

  return (
    <div className="min-h-screen bg-[#fff8fa] text-zinc-800" id="topo">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Plans />
        <Benefits />
        <Examples />
        <Reviews />
        <Contact />
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  )
}

export default App
