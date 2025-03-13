'use client';

import Navbar from '@/src/app/components/Navbar';
import HeroSection from '@/src/app/components/HeroSection';
import BenefitsSection from '@/src/app/components/BenefitsSection';
import ServicesSection from '@/src/app/components/ServicesSection';
import StudioSection from '@/src/app/components/StudioSection';
import PlansSection from '@/src/app/components/PlansSection';
import ProcessSection from '@/src/app/components/ProcessSection';
import NewsCarousel from '@/src/app/components/NewsCarousel';
import ContactSection from '@/src/app/components/ContactSection';
import Footer from '@/src/app/components/Footer';
import EasterEgg from '@/src/app/components/EasterEgg';
import PartnerLogoCarousel from '@/src/app/components/PartnerLogoCarousel';

export default function Home() {
  /**
   * List of partners to display in the carousel
   */
  const partners = [
    {
      id: 'partner1',
      name: 'Smartway Media',
      logo: '/partners/smartwaymedia_logo.png',
      url: 'https://www.smartwaymedia.co.uk/',
    },
    {
      id: 'partner2',
      name: 'Leicester Podcast Studio',
      logo: '/partners/lps.png',
      url: 'https://leicesterpodcaststudio.co.uk/',
    },
    {
      id: 'partner3',
      name: 'Cross Productions',
      logo: '/partners/cross_productions_limited_logo.png',
      url: 'https://crossproductions.co.uk/',
    },
    {
      id: 'partner4',
      name: 'Everything Branded',
      logo: 'https://www.everythingbranded.co.uk/assets/images/logos/everything-branded.svg',
      url: 'https://www.everythingbranded.co.uk/',
    },
    {
      id: 'partner5',
      name: 'Yellow Glove Productions',
      logo: 'https://images.squarespace-cdn.com/content/v1/5ad5035155b02ca840e1ad39/607dd169-ce5b-4d5c-b039-0200ce0fb8ec/Logo+file+2024+for+web.png?format=1500w',
      url: 'https://yellow-glove.co.uk/',
    },
    {
      id: 'partner6',
      name: 'Twin Planets',
      logo: 'https://twinplanets.co.uk/assets/images/img-1605-304x193.png',
      url: 'https://twinplanets.co.uk/',
    },
  ];

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <div className="parallax-container">
        <Navbar />
        <HeroSection />

        {/* Partner Logo Carousel with vanilla JS implementation */}
        <PartnerLogoCarousel
          partners={partners}
          background="linear-gradient(to bottom, rgba(18, 18, 18, 0.98), rgba(26, 26, 26, 0.98))"
          className="border-t border-b border-primary border-opacity-10"
          title="Trusted By Industry Leaders"
          subtitle="Collaborating with top organisations to deliver exceptional immersive experiences"
        />

        <BenefitsSection />
        <ServicesSection />
        <StudioSection />
        <PlansSection />
        <ProcessSection />
        <NewsCarousel />
        <ContactSection />
        <Footer />
        <EasterEgg />
      </div>
    </main>
  );
}
