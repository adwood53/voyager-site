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

export default function Home() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <div className="parallax-container">
        <Navbar />
        <HeroSection />
        <BenefitsSection />
        <ServicesSection />
        <StudioSection />
        <PlansSection />
        <ProcessSection />
        <NewsCarousel />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
