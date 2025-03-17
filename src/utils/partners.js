// src/utils/partners.js
'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useOrganization, useUser } from '@clerk/nextjs';

// Define the Partner Context
const PartnerContext = createContext(null);

// Default pricing tiers for merchandise
const DEFAULT_PRICING = {
  tier1: 500,
  tier2: 1000,
  tier3: 2000,
};

// Default unit prices for NFC quantities
const DEFAULT_UNITS = {
  unit1: 1.5, // Tier 1 unit price
  unit2: 2.5, // Tier 2+ unit price
};

// Default partner configuration
const DEFAULT_CONFIG = {
  features: {
    showPrice: true,
    showPdfExport: true,
    recommendProducts: true,
    nfcUnits: true,
  },
  pricing: {
    ...DEFAULT_PRICING,
    ...DEFAULT_UNITS,
  },
};

// Partner Provider component
export function PartnerProvider({ children }) {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    // Function to build the brand source string
    const buildBrandSource = () => {
      const userName = user
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
        : '';
      const orgName = organization?.name || '';

      // Format: "SalesPerson @ Organization" or fallback values if missing
      if (userName && orgName) {
        return `${userName} @ ${orgName}`;
      } else if (orgName) {
        return orgName;
      } else if (userName) {
        return userName;
      }
      return 'voyager'; // Default fallback
    };

    // Get partner info from organization or default
    const getPartnerConfig = () => {
      // In a real implementation, this might fetch from an API or database
      // For now, we'll use organization metadata or defaults

      return {
        name: organization?.name || 'Voyager',
        id: organization?.id || 'default',
        userId: user?.id,
        userName: user
          ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
          : '',
        email: user?.primaryEmailAddress?.emailAddress || '',
        brandSource: buildBrandSource(),
        // Partner-specific configuration (could be fetched from backend)
        config: {
          // Whether to show white-label pricing or referral pricing
          pricingType: 'white-label', // or 'referral'

          // Features enabled for this partner
          features: {
            showPrice: true, // Whether to show prices
            showPdfExport: true, // Whether to allow PDF export
            recommendProducts: true, // Whether to show recommendations
            nfcUnits: true, // Whether to use numeric NFC units
          },

          // Pricing structure
          pricing: {
            tier1: 500, // Base price for tier 1
            tier2: 1000, // Base price for tier 2
            tier3: 2000, // Base price for tier 3
            unit1: 1.5, // Per unit cost for tier 1 NFC
            unit2: 2.5, // Per unit cost for tier 2+ NFC
            commissionRate: 0.2, // Commission rate (20%) for referral pricing
          },
        },
      };
    };

    if (organization || user) {
      setPartner(getPartnerConfig());
    } else {
      setPartner({
        name: 'Voyager',
        id: 'default',
        brandSource: 'voyager',
        config: DEFAULT_CONFIG,
      });
    }
  }, [organization, user]);

  return (
    <PartnerContext.Provider value={partner}>
      {children}
    </PartnerContext.Provider>
  );
}

// Hook to use partner context
export function usePartner() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    return {
      name: 'Voyager',
      id: 'default',
      brandSource: 'voyager',
      config: DEFAULT_CONFIG,
    };
  }
  return context;
}

// Helper to calculate white-label or referral pricing
export function calculatePartnerPrice(
  basePrice,
  partner,
  quantity = 0
) {
  if (!partner) return { price: basePrice, commission: 0 };

  const { config } = partner;
  const pricingType = config?.pricingType || 'white-label';
  const commissionRate = config?.pricing?.commissionRate || 0.2;

  // Add unit costs for NFC quantities if applicable
  let totalPrice = basePrice;
  if (quantity > 0) {
    const unitPrice =
      basePrice >= 1000
        ? config?.pricing?.unit2 || DEFAULT_UNITS.unit2
        : config?.pricing?.unit1 || DEFAULT_UNITS.unit1;

    totalPrice += quantity * unitPrice;
  }

  // Calculate based on pricing type
  if (pricingType === 'referral') {
    const commission = totalPrice * commissionRate;
    return {
      price: totalPrice,
      commission,
      clientPrice: totalPrice,
      partnerPrice: commission,
      isWhiteLabel: false,
    };
  } else {
    // White-label pricing
    return {
      price: totalPrice,
      commission: 0,
      clientPrice: null, // Partner determines final client price
      partnerPrice: totalPrice,
      isWhiteLabel: true,
    };
  }
}
