'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotComponent from '../components/ChatbotComponent';
import HowHeroSection from '../components/how/HowHeroSection';
import WorkingWithUs from '../components/how/WorkingWithUs';
import FAQSection from '../components/how/FAQSection';
import ContactSection from '@/src/app/components/ContactSection';

export default function ForBrandsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ChatbotComponent />
      <div className="parallax-container">
        <Navbar />
        <HowHeroSection />
        <WorkingWithUs />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
