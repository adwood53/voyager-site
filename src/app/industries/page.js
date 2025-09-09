/**
 * @fileoverview Industries Page - Main page using section components
 *
 * Follows the same pattern as for-brands/page.js with section components.
 * Hero + Industries Grid + Case Studies CTA in that order.
 */

'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotComponent from '../components/ChatbotComponent';
import IndustriesHeroSection from '../components/industries/IndustriesHeroSection';
import IndustriesSection from '../components/industries/IndustriesSection';
import CaseStudiesCTA from '../components/industries/CaseStudiesCTA';
import ContactSection from '@/src/app/components/ContactSection';
import ReviewPopup from '@/src/app/components/ReviewPopup';
import { ModalProvider } from '../components/modal/core/ModalEngine';

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ModalProvider config={{ baseZIndex: 1000 }}>
        <ChatbotComponent />
        <div className="parallax-container">
          <Navbar />
          <ReviewPopup />
          <IndustriesHeroSection />
          <div className="isolate" style={{ isolation: 'isolate' }}>
            <IndustriesSection />
          </div>
          <CaseStudiesCTA />
          <ContactSection />
          <Footer />
        </div>
      </ModalProvider>
    </main>
  );
}
