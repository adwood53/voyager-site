/**
 * @fileoverview Hyrox Corby case study page
 *
 * Individual case study page for the Hyrox Corby NFC bottled water project.
 * Imports and renders the HyroxCorbySection component.
 */

import HyroxCorbySection from '../../../components/industries/case-studies/studies/HyroxCorbySection';
import { ModalProvider } from '../../../components/modal/core/ModalEngine';

export default function HyroxCorbyPage() {
  return (
    <ModalProvider config={{ baseZIndex: 1000 }}>
      <HyroxCorbySection />
    </ModalProvider>
  );
}
