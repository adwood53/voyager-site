'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotComponent from '../components/ChatbotComponent';
import BrandsHeroSection from '../components/brands/BrandsHeroSection';
import WhatWeDoSection from '../components/brands/WhatWeDoSection';
import ProductsSection from '../components/brands/ProductsSection';
import ExperiencesSection from '../components/brands/ExperiencesSection';
import WhyVoyagerSection from '../components/brands/WhyVoyagerSection';
import ContactSection from '@/src/app/components/ContactSection';
import BrandsStudioSection from '../components/brands/BrandsStudioSection';
import BrandsServicesSection from '../components/brands/BrandsServicesSection';
import { ModalProvider } from '../components/modal/core/ModalEngine';

export default function ForBrandsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ModalProvider config={{ baseZIndex: 1000 }}>
        <ChatbotComponent />
        <div className="parallax-container">
          <Navbar />
          <BrandsHeroSection />
          <WhatWeDoSection />
          <ExperiencesSection />
          <WhyVoyagerSection />
          <ContactSection />
          <Footer />
        </div>
      </ModalProvider>
    </main>
  );
}
