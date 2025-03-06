// src/app/components/DynamicBrandingWrapper.js
'use client';

import { useFirebase } from '@/src/contexts/FirebaseContext';
import DynamicBranding from './DynamicBranding';

export default function DynamicBrandingWrapper({ children }) {
  const { organization } = useFirebase();

  return (
    <DynamicBranding organization={organization}>
      {children}
    </DynamicBranding>
  );
}
