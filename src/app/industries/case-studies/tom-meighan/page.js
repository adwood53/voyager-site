/**
 * @fileoverview Tom Meighan case study page
 *
 * Individual case study page for the Tom Meighan NFC vinyl and VCards project.
 * Imports and renders the TomMeighanSection component.
 */

import TomMeighanSection from '../../../components/industries/case-studies/studies/TomMeighanSection';
import { ModalProvider } from '../../../components/modal/core/ModalEngine';

export default function TomMeighanPage() {
  return (
    <ModalProvider config={{ baseZIndex: 1000 }}>
      <TomMeighanSection />
    </ModalProvider>
  );
}
