'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotComponent from '../components/ChatbotComponent';
import BrandsHeroSection from '../components/brands/BrandsHeroSection';
import WhatWeDoSection from '../components/brands/WhatWeDoSection';
import ProductsSection from '../components/brands/ProductsSection';
import ExperiencesSection from '../components/brands/ExperiencesSection';
import WhyVoyagerSection from '../components/brands/WhyVoyagerSection';
import FAQSection from '../components/how/FAQSection';
import ContactSection from '@/src/app/components/ContactSection';
import BrandsStudioSection from '../components/brands/BrandsStudioSection';

export default function ForBrandsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ChatbotComponent />
      <div className="parallax-container">
        <Navbar />
        <BrandsHeroSection />
        <WhatWeDoSection />
        <ProductsSection />
        <ExperiencesSection />
        <BrandsStudioSection />
        <WhyVoyagerSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
