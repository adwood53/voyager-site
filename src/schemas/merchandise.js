// src/schemas/merchandise.js
const merchandiseSchema = {
  id: 'merchandise',
  title: 'Interactive Merchandise Calculator',
  purpose: 'pricing',
  actions: {
    submitToCRM: true,
    exportToPDF: true,
    showRecommendations: false,
  },
  description:
    'Calculate costs for interactive merchandise with embedded digital experiences.',
  sections: [
    {
      id: 'pricing-structure',
      title: 'Pricing Structure',
      questions: [
        {
          id: 'pricingType',
          type: 'single-select',
          label:
            'Would you like to refer this with a partner commission, or would you like to white-label this?',
          options: [
            {
              id: 'partner',
              label: 'Partner (Commission Pricing Structure Applied)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Pricing Structure: Partner Commission',
                },
                { type: 'set-pricing-structure', value: 'partner' },
              ],
            },
            {
              id: 'white-label',
              label:
                'White Label (White Label Pricing Structure Applied)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Pricing Structure: White Label',
                },
                {
                  type: 'set-pricing-structure',
                  value: 'white-label',
                },
              ],
            },
          ],
        },
        {
          id: 'experienceType',
          type: 'single-select',
          label:
            'Is this a new experience, or are you adding a new scan target to an existing experience?',
          options: [
            {
              id: 'new-experience',
              label: 'New Experience',
              effects: [
                { type: 'add-feature', value: 'New Experience' },
                {
                  type: 'add-price',
                  value: 750,
                  condition: { pricingStructure: 'partner' },
                  name: 'New Experience Setup',
                },
                {
                  type: 'add-price',
                  value: 299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'New Experience Setup',
                },
                { type: 'set-tier', value: 1 }, // New experiences are more complex (tier 2)
              ],
            },
            {
              id: 'new-target',
              label: 'New Target',
              effects: [
                { type: 'add-feature', value: 'New Scan Target' },
                {
                  type: 'add-price',
                  value: 250,
                  name: 'New Target Setup',
                },
                { type: 'set-tier', value: 1 }, // New targets are simpler (tier 1)
              ],
            },
          ],
        },
        {
          id: 'productCategory',
          type: 'single-select',
          label:
            'Are you looking for posters, business cards, or a bundle?',
          options: [
            {
              id: 'posters',
              label: 'Posters',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product Category: Posters',
                },
              ],
            },
            {
              id: 'business-cards',
              label: 'Business Cards',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product Category: Business Cards',
                },
              ],
            },
            {
              id: 'bundles',
              label: 'Bundles',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product Category: Bundles',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'poster-options',
      title: 'Poster Options',
      dependsOn: {
        questionId: 'productCategory',
        value: 'posters',
      },
      questions: [
        {
          id: 'a1PosterQuantity',
          type: 'single-select',
          label: 'How many A1 Posters do you need?',
          options: [
            {
              id: 'none',
              label: 'None',
              effects: [],
            },
            {
              id: '10',
              label: '10',
              effects: [
                { type: 'add-feature', value: 'A1 Posters: 10' },
                {
                  type: 'add-price',
                  value: 1000,
                  condition: { pricingStructure: 'partner' },
                  name: 'A1 Posters (10)',
                },
                {
                  type: 'add-commission',
                  value: 'A1 Posters (10)', // Remove the commission amount from displayed text
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 549,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A1 Posters (10)',
                },
              ],
            },
            {
              id: '25',
              label: '25',
              effects: [
                { type: 'add-feature', value: 'A1 Posters: 25' },
                {
                  type: 'add-price',
                  value: 1250,
                  condition: { pricingStructure: 'partner' },
                  name: 'A1 Posters (25)',
                },
                {
                  type: 'add-commission',
                  value: 'A1 Posters (25)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 799,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A1 Posters (25)',
                },
              ],
            },
            {
              id: '50',
              label: '50',
              effects: [
                { type: 'add-feature', value: 'A1 Posters: 50' },
                {
                  type: 'add-price',
                  value: 1500,
                  condition: { pricingStructure: 'partner' },
                  name: 'A1 Posters (50)',
                },
                {
                  type: 'add-commission',
                  value: 'A1 Posters (50)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1049,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A1 Posters (50)',
                },
              ],
            },
            {
              id: '100',
              label: '100',
              effects: [
                { type: 'add-feature', value: 'A1 Posters: 100' },
                {
                  type: 'add-price',
                  value: 1650,
                  condition: { pricingStructure: 'partner' },
                  name: 'A1 Posters (100)',
                },
                {
                  type: 'add-commission',
                  value: 'A1 Posters (100)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1199,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A1 Posters (100)',
                },
              ],
            },
          ],
        },
        {
          id: 'a2PosterQuantity',
          type: 'single-select',
          label: 'How many A2 Posters do you need?',
          options: [
            {
              id: 'none',
              label: 'None',
              effects: [],
            },
            {
              id: '100',
              label: '100',
              effects: [
                { type: 'add-feature', value: 'A2 Posters: 100' },
                {
                  type: 'add-price',
                  value: 2750,
                  condition: { pricingStructure: 'partner' },
                  name: 'A2 Posters (100)',
                },
                {
                  type: 'add-commission',
                  value: 'A2 Posters (100)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 2299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A2 Posters (100)',
                },
              ],
            },
            {
              id: '250',
              label: '250',
              effects: [
                { type: 'add-feature', value: 'A2 Posters: 250' },
                {
                  type: 'add-price',
                  value: 4500,
                  condition: { pricingStructure: 'partner' },
                  name: 'A2 Posters (250)',
                },
                {
                  type: 'add-commission',
                  value: 'A2 Posters (250)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 4049,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A2 Posters (250)',
                },
              ],
            },
            {
              id: '500',
              label: '500',
              effects: [
                { type: 'add-feature', value: 'A2 Posters: 500' },
                {
                  type: 'add-price',
                  value: 5250,
                  condition: { pricingStructure: 'partner' },
                  name: 'A2 Posters (500)',
                },
                {
                  type: 'add-commission',
                  value: 'A2 Posters (500)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 4799,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A2 Posters (500)',
                },
              ],
            },
            {
              id: '1000',
              label: '1000',
              effects: [
                { type: 'add-feature', value: 'A2 Posters: 1000' },
                {
                  type: 'add-price',
                  value: 6750,
                  condition: { pricingStructure: 'partner' },
                  name: 'A2 Posters (1000)',
                },
                {
                  type: 'add-commission',
                  value: 'A2 Posters (1000)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 6299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A2 Posters (1000)',
                },
              ],
            },
          ],
        },
        {
          id: 'a3PosterQuantity',
          type: 'single-select',
          label: 'How many A3 Posters do you need?',
          options: [
            {
              id: 'none',
              label: 'None',
              effects: [],
            },
            {
              id: '10',
              label: '10',
              effects: [
                { type: 'add-feature', value: 'A3 Posters: 10' },
                {
                  type: 'add-price',
                  value: 900,
                  condition: { pricingStructure: 'partner' },
                  name: 'A3 Posters (10)',
                },
                {
                  type: 'add-commission',
                  value: 'A3 Posters (10)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 449,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A3 Posters (10)',
                },
              ],
            },
            {
              id: '100',
              label: '100',
              effects: [
                { type: 'add-feature', value: 'A3 Posters: 100' },
                {
                  type: 'add-price',
                  value: 1150,
                  condition: { pricingStructure: 'partner' },
                  name: 'A3 Posters (100)',
                },
                {
                  type: 'add-commission',
                  value: 'A3 Posters (100)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 699,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A3 Posters (100)',
                },
              ],
            },
            {
              id: '250',
              label: '250',
              effects: [
                { type: 'add-feature', value: 'A3 Posters: 250' },
                {
                  type: 'add-price',
                  value: 1750,
                  condition: { pricingStructure: 'partner' },
                  name: 'A3 Posters (250)',
                },
                {
                  type: 'add-commission',
                  value: 'A3 Posters (250)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A3 Posters (250)',
                },
              ],
            },
            {
              id: '500',
              label: '500',
              effects: [
                { type: 'add-feature', value: 'A3 Posters: 500' },
                {
                  type: 'add-price',
                  value: 1800,
                  condition: { pricingStructure: 'partner' },
                  name: 'A3 Posters (500)',
                },
                {
                  type: 'add-commission',
                  value: 'A3 Posters (500)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1349,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A3 Posters (500)',
                },
              ],
            },
            {
              id: '1000',
              label: '1000',
              effects: [
                { type: 'add-feature', value: 'A3 Posters: 1000' },
                {
                  type: 'add-price',
                  value: 2250,
                  condition: { pricingStructure: 'partner' },
                  name: 'A3 Posters (1000)',
                },
                {
                  type: 'add-commission',
                  value: 'A3 Posters (1000)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1799,
                  condition: { pricingStructure: 'white-label' },
                  name: 'A3 Posters (1000)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'business-card-options',
      title: 'Business Card Options',
      dependsOn: {
        questionId: 'productCategory',
        value: 'business-cards',
      },
      questions: [
        {
          id: 'businessCardQuantity',
          type: 'single-select',
          label: 'How many Business Cards do you require?',
          options: [
            {
              id: '10',
              label: '10',
              effects: [
                { type: 'add-feature', value: 'Business Cards: 10' },
                {
                  type: 'add-price',
                  value: 1000,
                  condition: { pricingStructure: 'partner' },
                  name: 'Business Cards (10)',
                },
                {
                  type: 'add-commission',
                  value: 'Business Cards (10)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 549,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Business Cards (10)',
                },
              ],
            },
            {
              id: '50',
              label: '50',
              effects: [
                { type: 'add-feature', value: 'Business Cards: 50' },
                {
                  type: 'add-price',
                  value: 1750,
                  condition: { pricingStructure: 'partner' },
                  name: 'Business Cards (50)',
                },
                {
                  type: 'add-commission',
                  value: 'Business Cards (50)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Business Cards (50)',
                },
              ],
            },
            {
              id: '100',
              label: '100',
              effects: [
                { type: 'add-feature', value: 'Business Cards: 100' },
                {
                  type: 'add-price',
                  value: 2250,
                  condition: { pricingStructure: 'partner' },
                  name: 'Business Cards (100)',
                },
                {
                  type: 'add-commission',
                  value: 'Business Cards (100)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1799,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Business Cards (100)',
                },
              ],
            },
            {
              id: '500',
              label: '500',
              effects: [
                { type: 'add-feature', value: 'Business Cards: 500' },
                {
                  type: 'add-price',
                  value: 2750,
                  condition: { pricingStructure: 'partner' },
                  name: 'Business Cards (500)',
                },
                {
                  type: 'add-commission',
                  value: 'Business Cards (500)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 2299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Business Cards (500)',
                },
              ],
            },
            {
              id: '1000',
              label: '1000',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Business Cards: 1000',
                },
                {
                  type: 'add-price',
                  value: 3250,
                  condition: { pricingStructure: 'partner' },
                  name: 'Business Cards (1000)',
                },
                {
                  type: 'add-commission',
                  value: 'Business Cards (1000)',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 2799,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Business Cards (1000)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'bundle-options',
      title: 'Bundle Options',
      dependsOn: {
        questionId: 'productCategory',
        value: 'bundles',
      },
      questions: [
        {
          id: 'bundleType',
          type: 'single-select',
          label: 'Which bundle are you looking for?',
          options: [
            {
              id: 'entry-level',
              label: 'Entry-Level',
              effects: [
                { type: 'add-feature', value: 'Bundle: Entry-Level' },
                {
                  type: 'add-price',
                  value: 995,
                  condition: { pricingStructure: 'partner' },
                  name: 'Entry-Level Bundle',
                },
                {
                  type: 'add-commission',
                  value: 'Entry-Level Bundle',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 495,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Entry-Level Bundle',
                },
                { type: 'set-tier', value: 1 }, // Entry level is tier 1
              ],
            },
            {
              id: 'enhanced-marketing',
              label: 'Enhanced Marketing',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Bundle: Enhanced Marketing',
                },
                {
                  type: 'add-price',
                  value: 1599,
                  condition: { pricingStructure: 'partner' },
                  name: 'Enhanced Marketing Bundle',
                },
                {
                  type: 'add-commission',
                  value: 'Enhanced Marketing Bundle',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 1299,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Enhanced Marketing Bundle',
                },
                { type: 'set-tier', value: 1 }, // Enhanced level is tier 1
              ],
            },
            {
              id: 'premium',
              label: 'Premium',
              effects: [
                { type: 'add-feature', value: 'Bundle: Premium' },
                {
                  type: 'add-price',
                  value: 3599,
                  condition: { pricingStructure: 'partner' },
                  name: 'Premium Bundle',
                },
                {
                  type: 'add-commission',
                  value: 'Premium Bundle',
                  condition: { pricingStructure: 'partner' },
                },
                {
                  type: 'add-price',
                  value: 2999,
                  condition: { pricingStructure: 'white-label' },
                  name: 'Premium Bundle',
                },
                { type: 'set-tier', value: 1 }, // Premium level is tier 1
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'extras',
      title: 'Extras',
      questions: [
        {
          id: 'need3dLogo',
          type: 'single-select',
          label:
            'Do you require a 3D logo created for your brand? (If your answer is no, be sure to provide us with your 3D Logo in .glb format)',
          options: [
            {
              id: 'yes',
              label: 'Yes',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Requires 3D Logo Creation',
                },
                {
                  type: 'add-price',
                  value: 156.8,
                  name: '3D Logo Creation',
                },
                {
                  type: 'add-commission',
                  value: '3D Logo Creation',
                  condition: { pricingStructure: 'partner' },
                },
              ],
            },
            {
              id: 'no',
              label: 'No',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Client Will Provide 3D Logo',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'project-details',
      title: 'Project Details',
      questions: [
        {
          id: 'projectDetails',
          type: 'text',
          multiline: true,
          label: 'Please share your project details with us.',
          placeholder: 'Describe your project and requirements...',
          effects: [
            { type: 'add-feature', value: 'Project Details' },
            { type: 'set-project-details', value: 'projectDetails' },
          ],
        },
        {
          id: 'projectPurpose',
          type: 'text',
          multiline: true,
          label:
            'What is the purpose of your project? (E.G. Increase sales, marketing campaign)',
          placeholder:
            'Explain the purpose and goals of this project...',
          effects: [
            { type: 'add-feature', value: 'Project Purpose' },
          ],
        },
        {
          id: 'projectName',
          type: 'text',
          label: 'What is the name of the project?',
          effects: [{ type: 'add-feature', value: 'Project Name' }],
        },
      ],
    },
  ],
};

export default merchandiseSchema;
