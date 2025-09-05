'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotComponent from '../components/ChatbotComponent';
import HowHeroSection from '../components/how/HowHeroSection';
import WorkingWithUs from '../components/how/WorkingWithUs';
import FAQSection from '../components/how/FAQSection';
import ContactSection from '@/src/app/components/ContactSection';
import ReviewPopup from '@/src/app/components/ReviewPopup';
import { ModalProvider } from '../components/modal/core/ModalEngine';

export default function ForBrandsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ModalProvider>
        <ChatbotComponent />
        <div className="parallax-container">
          <Navbar />
          <ReviewPopup />
          <HowHeroSection />
          <WorkingWithUs />
          <FAQSection />
          <ContactSection />
          <Footer />
        </div>
      </ModalProvider>
    </main>
  );
}
