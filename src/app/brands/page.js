'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotComponent from '../components/ChatbotComponent';
import BrandsHeroSection from '../components/brands/BrandsHeroSection';
import WhatWeDoSection from '../components/brands/WhatWeDoSection';
import ProductsSection from '../components/brands/ProductsSection';
import ExperiencesSection from '../components/brands/ExperiencesSection';
import WhyVoyagerSection from '../components/brands/WhyVoyagerSection';
import FAQSection from '../components/brands/FAQSection';

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ChatbotComponent />
      <div className="parallax-container">
        <Navbar />
        <BrandsHeroSection />
        <WhatWeDoSection />
        <ProductsSection />
        <ExperiencesSection />
        <WhyVoyagerSection />
        <FAQSection />
        <Footer />
      </div>
    </main>
  );
}
