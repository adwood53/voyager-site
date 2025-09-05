/**
 * @fileoverview Oloye Aesthetics case study page
 *
 * Individual case study page for the Oloye Aesthetics digital transformation project.
 * Imports and renders the OloyeAestheticsSection component.
 */

import OloyeAestheticsSection from '../../../components/industries/case-studies/studies/OloyeAestheticsSection';
import { ModalProvider } from '../../../components/modal/core/ModalEngine';

export default function OloyeAestheticsPage() {
  return (
    <ModalProvider config={{ baseZIndex: 1000 }}>
      <OloyeAestheticsSection />
    </ModalProvider>
  );
}
