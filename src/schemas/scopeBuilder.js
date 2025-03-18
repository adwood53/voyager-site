// src/schemas/scopeBuilder.js
const scopeBuilderSchema = {
  id: 'scope-builder',
  title: 'Voyager Scope Builder',
  subtitle: 'Find the Perfect Solution for Your Brand!',
  purpose: 'recommendation',
  actions: {
    submitToCRM: false,
    exportToPDF: true,
    showRecommendations: true,
  },
  description:
    'This calculator helps you determine the best immersive technology approach for your project needs.',
  sections: [
    {
      id: 'define-goals',
      title: 'Step 1: Define Your Goals',
      questions: [
        {
          id: 'nfcGoals',
          type: 'multi-select',
          label: '1️⃣ What do you want to achieve with NFC?',
          helpText: 'Select all that apply',
          options: [
            {
              id: 'engagement',
              label: 'Increase customer engagement',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Goal: Increase customer engagement',
                },
              ],
            },
            {
              id: 'product-info',
              label: 'Provide interactive product information',
              effects: [
                {
                  type: 'add-feature',
                  value:
                    'Goal: Provide interactive product information',
                },
              ],
            },
            {
              id: 'enhance-experiences',
              label: 'Enhance in-store or event experiences',
              effects: [
                {
                  type: 'add-feature',
                  value:
                    'Goal: Enhance in-store or event experiences',
                },
              ],
            },
            {
              id: 'customer-loyalty',
              label: 'Reward customer loyalty',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Goal: Reward customer loyalty',
                },
              ],
            },
            {
              id: 'generate-sales',
              label: 'Generate more sales through promotions',
              effects: [
                {
                  type: 'add-feature',
                  value:
                    'Goal: Generate more sales through promotions',
                },
              ],
            },
            {
              id: 'other-goal',
              label: 'Other (please specify)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Goal: Other (custom)',
                },
              ],
            },
          ],
        },
        {
          id: 'targetAudience',
          type: 'text',
          multiline: true,
          label: '2️⃣ Who is your target audience?',
          helpText: 'Age, interests, customer behavior, etc.',
          effects: [
            { type: 'add-feature', value: 'Target Audience Details' },
          ],
        },
        {
          id: 'interactionLocations',
          type: 'multi-select',
          label: '3️⃣ Where will customers interact with NFC?',
          helpText: 'Select all that apply',
          options: [
            {
              id: 'in-store',
              label: 'In-store',
              effects: [
                { type: 'add-feature', value: 'Location: In-store' },
              ],
            },
            {
              id: 'event',
              label: 'At an event',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Location: At an event',
                },
              ],
            },
            {
              id: 'packaging',
              label: 'On product packaging',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Location: On product packaging',
                },
              ],
            },
            {
              id: 'marketing-materials',
              label: 'On posters or marketing materials',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Location: On marketing materials',
                },
              ],
            },
            {
              id: 'digital-experience',
              label: 'Online (linked to a digital experience)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Location: Online/digital',
                },
              ],
            },
            {
              id: 'other-location',
              label: 'Other (please specify)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Location: Other (custom)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'interactive-experience',
      title: 'Step 2: Choose Your Interactive Experience',
      questions: [
        {
          id: 'interactionType',
          type: 'multi-select',
          label: '4️⃣ What type of interaction do you want?',
          helpText: 'Select all that apply',
          options: [
            {
              id: 'storytelling',
              label: 'Storytelling & Brand Engagement',
              description:
                'Customers tap to see behind-the-scenes videos, meet the makers, or access exclusive content.',
              effects: [
                {
                  type: 'add-feature',
                  value:
                    'Interaction: Storytelling & Brand Engagement',
                },
                { type: 'add-price', value: 200 },
              ],
            },
            {
              id: 'gamification',
              label: 'Gamification & Fun',
              description:
                'Customers participate in interactive challenges, scavenger hunts, or spin-the-wheel promotions.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: Gamification & Fun',
                },
                { type: 'add-price', value: 300 },
              ],
            },
            {
              id: 'augmented-reality',
              label: 'Augmented Reality (AR) or Virtual Try-On',
              description:
                'Let customers visualize products in 3D or "try on" items digitally.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: Augmented Reality (AR)',
                },
                { type: 'add-price', value: 500 },
              ],
            },
            {
              id: 'rewards-loyalty',
              label: 'Instant Rewards & Loyalty',
              description:
                'Customers unlock points, special offers, or VIP content.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: Instant Rewards & Loyalty',
                },
                { type: 'add-price', value: 250 },
              ],
            },
            {
              id: 'live-events',
              label: 'Live Event Enhancements',
              description:
                'Tap to access maps, schedules, exclusive event content, or networking opportunities.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: Live Event Enhancements',
                },
                { type: 'add-price', value: 350 },
              ],
            },
            {
              id: 'authentication',
              label: 'Product Authentication & Verification',
              description:
                'NFC confirms product authenticity, ideal for luxury brands.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: Product Authentication',
                },
                { type: 'add-price', value: 400 },
              ],
            },
            {
              id: 'data-collection',
              label: 'Data Collection & CRM Integration',
              description:
                'Use NFC to gather customer insights for future marketing.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: Data Collection & CRM',
                },
                { type: 'add-price', value: 450 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'content-integration',
      title: 'Step 3: Content & Integration',
      questions: [
        {
          id: 'contentType',
          type: 'multi-select',
          label:
            '5️⃣ What kind of digital content do you want to have in the experience?',
          options: [
            {
              id: 'videos',
              label: 'Videos & multimedia',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Content: Videos & multimedia',
                },
              ],
            },
            {
              id: 'interactive-websites',
              label: 'Interactive websites',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Content: Interactive websites',
                },
              ],
            },
            {
              id: 'ar-features',
              label: 'Augmented reality features',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Content: AR features',
                },
              ],
            },
            {
              id: 'promotions',
              label: 'Exclusive discounts or promotions',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Content: Discounts/promotions',
                },
              ],
            },
            {
              id: 'social-media',
              label: 'Social media links & sharing options',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Content: Social media integration',
                },
              ],
            },
            {
              id: 'contact-info',
              label: 'Contact information or booking forms',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Content: Contact/booking',
                },
              ],
            },
          ],
        },
        {
          id: 'systemIntegration',
          type: 'single-select',
          label:
            '6️⃣ Do you need NFC to integrate with an existing system?',
          helpText:
            'e.g., loyalty programs, e-commerce, CRM software, event apps',
          options: [
            {
              id: 'yes-integration',
              label: 'Yes, we have a system in place',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Needs system integration',
                },
                { type: 'add-price', value: 350 },
                {
                  type: 'add-commission',
                  value: 'System Integration',
                },
              ],
            },
            {
              id: 'no-integration',
              label: 'No, we need a standalone experience',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Standalone experience',
                },
              ],
            },
          ],
        },
        {
          id: 'customerAccess',
          type: 'multi-select',
          label: '7️⃣ How will customers access the experience?',
          options: [
            {
              id: 'nfc-product',
              label: 'Tap an NFC-enabled product',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Access: NFC-enabled product',
                },
              ],
            },
            {
              id: 'nfc-poster',
              label: 'Scan an NFC-powered poster or display',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Access: NFC-powered poster/display',
                },
              ],
            },
            {
              id: 'nfc-badge',
              label: 'Use NFC-enabled event badges or wristbands',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Access: NFC-enabled badges/wristbands',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'budget-complexity',
      title: 'Step 4: Budget & Complexity',
      questions: [
        {
          id: 'experienceLevel',
          type: 'single-select',
          label:
            '8️⃣ How interactive or immersive do you want the experience to be?',
          options: [
            {
              id: 'basic',
              label: '💡 Basic (Tier 1)',
              description:
                'Simple website or video link, static NFC content, custom branding.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Experience Level: Basic (Tier 1)',
                },
                { type: 'set-tier', value: 1 },
              ],
            },
            {
              id: 'mid-level',
              label: '⚡ Mid-Level (Tier 2)',
              description: 'Gamification, interactive content.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Experience Level: Mid-Level (Tier 2)',
                },
                { type: 'set-tier', value: 2 },
              ],
            },
            {
              id: 'premium',
              label: '🚀 Premium (Tier 3)',
              description:
                'Full AR/VR integration, advanced analytics, CRM connections.',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Experience Level: Premium (Tier 3)',
                },
                { type: 'set-tier', value: 3 },
              ],
            },
          ],
        },
        {
          id: 'nfcQuantity',
          type: 'numeric',
          label: '9️⃣ How many NFC-enabled items do you need?',
          helpText:
            'E.g., number of products, posters, event passes, etc.',
          min: 1,
          max: 10000,
          effects: [{ type: 'add-feature', value: 'NFC Quantity' }],
        },
        {
          id: 'ongoingSupport',
          type: 'yes-no',
          label:
            '🔟 Do you need ongoing support and analytics tracking?',
          options: [
            {
              id: 'yes-support',
              label: 'Yes, I want insights on user interactions',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Needs ongoing support & analytics',
                  condition: { answer: true },
                },
                {
                  type: 'add-price',
                  value: 250,
                  condition: { answer: true },
                },
              ],
            },
            {
              id: 'no-support',
              label: 'No, I just need the initial setup',
              effects: [
                {
                  type: 'add-feature',
                  value: 'No ongoing support needed',
                  condition: { answer: false },
                },
              ],
            },
          ],
        },
        {
          id: 'additionalInfo',
          type: 'text',
          multiline: true,
          label: 'Any additional information or requirements?',
          required: false,
          effects: [
            { type: 'add-feature', value: 'Additional Information' },
          ],
        },
      ],
    },
  ],
  recommendations: {
    logic: 'score-based',
    products: [
      {
        id: 'basic-nfc-package',
        name: 'Basic NFC Engagement Package',
        description:
          'An entry-level NFC solution with custom branding, simple tap-to-view content, and essential tracking.',
        conditions: [
          {
            questionId: 'experienceLevel',
            value: 'basic',
            weight: 3,
          },
          {
            questionId: 'interactionType',
            value: 'storytelling',
            weight: 1,
          },
          { questionId: 'nfcGoals', value: 'engagement', weight: 1 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 5, tier: 1 },
        },
        features: [
          'Custom-branded NFC tags',
          'Simple website landing page',
          'Basic analytics dashboard',
          'Content hosting for 12 months',
        ],
      },
      {
        id: 'interactive-nfc-package',
        name: 'Interactive NFC Experience',
        description:
          'A mid-level solution featuring gamification elements, interactive content, and data capture capabilities.',
        conditions: [
          {
            questionId: 'experienceLevel',
            value: 'mid-level',
            weight: 3,
          },
          {
            questionId: 'interactionType',
            value: 'gamification',
            weight: 2,
          },
          { questionId: 'ongoingSupport', value: true, weight: 1 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 2 },
          threshold2: { score: 6, tier: 2 },
        },
        features: [
          'Interactive gamification elements',
          'Customer data capture',
          'Detailed analytics reporting',
          'Content management system',
          'Monthly performance reports',
        ],
      },
      {
        id: 'premium-ar-nfc-package',
        name: 'Premium AR-NFC Solution',
        description:
          'Our highest-tier offering with augmented reality experiences, CRM integration, and comprehensive analytics.',
        conditions: [
          {
            questionId: 'experienceLevel',
            value: 'premium',
            weight: 3,
          },
          {
            questionId: 'interactionType',
            value: 'augmented-reality',
            weight: 2,
          },
          {
            questionId: 'systemIntegration',
            value: 'yes-integration',
            weight: 1,
          },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 3 },
          threshold2: { score: 6, tier: 3 },
        },
        features: [
          'Full AR integration',
          'Custom 3D models and animations',
          'CRM data integration',
          'Advanced user journey analytics',
          'Dedicated support team',
          'Quarterly strategy reviews',
        ],
      },
      {
        id: 'event-package',
        name: 'NFC Event Experience Package',
        description:
          'A specialized solution for events with NFC badges, check-ins, and real-time engagement features.',
        conditions: [
          {
            questionId: 'interactionType',
            value: 'live-events',
            weight: 3,
          },
          {
            questionId: 'customerAccess',
            value: 'nfc-badge',
            weight: 2,
          },
          {
            questionId: 'interactionLocations',
            value: 'event',
            weight: 1,
          },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 2 },
          threshold2: { score: 6, tier: 3 },
        },
        features: [
          'NFC-enabled event badges or wristbands',
          'Check-in/registration system',
          'Exclusive content unlocks',
          'Networking features',
          'Post-event analytics',
        ],
      },
      {
        id: 'loyalty-package',
        name: 'NFC Loyalty & Rewards System',
        description:
          'A dedicated solution for brands looking to enhance customer loyalty through NFC interactions.',
        conditions: [
          {
            questionId: 'interactionType',
            value: 'rewards-loyalty',
            weight: 3,
          },
          {
            questionId: 'nfcGoals',
            value: 'customer-loyalty',
            weight: 2,
          },
          {
            questionId: 'nfcGoals',
            value: 'generate-sales',
            weight: 1,
          },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 2 },
          threshold2: { score: 6, tier: 3 },
        },
        features: [
          'Points accrual system',
          'Reward redemption platform',
          'Customer profile portal',
          'Marketing automation triggers',
          'Customizable loyalty tiers',
        ],
      },
    ],
  },
};

export default scopeBuilderSchema;
