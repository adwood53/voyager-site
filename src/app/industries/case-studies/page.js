/**
 * @fileoverview Case Studies page
 *
 * Main case studies page combining hero and grid sections.
 * Showcases Voyager's work and proprietary technology approach.
 */

import CaseStudiesHeroSection from '../../components/industries/case-studies/CaseStudiesHeroSection';
import CaseStudiesGridSection from '../../components/industries/case-studies/CaseStudiesGridSection';
import ChatbotComponent from '../../components/ChatbotComponent';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ModalProvider } from '../../components/modal/core/ModalEngine';

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <ModalProvider config={{ baseZIndex: 1000 }}>
        <ChatbotComponent />
        <div className="parallax-container">
          <Navbar />
          <CaseStudiesHeroSection />
          <CaseStudiesGridSection />
          <Footer />
        </div>
      </ModalProvider>
    </main>
  );
}
