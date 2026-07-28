import { TrackingScripts } from './components/TrackingScripts'
import { SkipLink } from './components/layout/SkipLink'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { MobileStickyCta } from './components/layout/MobileStickyCta'
import { GiftBox } from './components/layout/GiftBox'
import { HeroSection } from './components/sections/HeroSection'
import { TrustSection } from './components/sections/TrustSection'
import { PromotionsSection } from './components/sections/PromotionsSection'
import { GameEcosystemSection } from './components/sections/GameEcosystemSection'
import { StatsSection } from './components/sections/StatsSection'
import { BenefitsSection } from './components/sections/BenefitsSection'
import { ServiceStandardsSection } from './components/sections/ServiceStandardsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { FaqSection } from './components/sections/FaqSection'
import { SeoContentSection } from './components/sections/SeoContentSection'
import { PaymentSection } from './components/sections/PaymentSection'
import { Reveal } from './components/ui/Reveal'
import { siteConfig } from '@/config/site'

function App() {
  return (
    <>
      <TrackingScripts />
      <SkipLink />
      <Header />

      <main id="main-content">
        <HeroSection />
        <TrustSection />

        <Reveal>
          <GameEcosystemSection />
        </Reveal>

        <PromotionsSection />

        <Reveal>
          <StatsSection />
        </Reveal>
        <Reveal>
          <BenefitsSection />
        </Reveal>
        <Reveal>
          <ServiceStandardsSection />
        </Reveal>
        {siteConfig.features.showTestimonials && (
          <Reveal>
            <TestimonialsSection />
          </Reveal>
        )}
        <Reveal>
          <FaqSection />
        </Reveal>
        <Reveal>
          <SeoContentSection />
        </Reveal>
        <Reveal>
          <PaymentSection />
        </Reveal>
      </main>

      <Footer />
      <MobileStickyCta />
      <GiftBox /></>
  )
}

export default App
