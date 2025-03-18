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
    'Calculate costs for interactive merchandise items with embedded digital experiences.',
  sections: [
    {
      id: 'product-type',
      title: 'Product Type',
      questions: [
        {
          id: 'merchandiseType',
          type: 'single-select',
          label: 'What type of merchandise are you interested in?',
          options: [
            {
              id: 'business-cards',
              label: 'Interactive Business Cards',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product: Interactive Business Cards',
                },
                { type: 'set-base-price', value: 150 }, // Base setup fee
              ],
            },
            {
              id: 'brochures',
              label: 'Interactive Brochures/Flyers',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product: Interactive Brochures/Flyers',
                },
                { type: 'set-base-price', value: 200 }, // Base setup fee
              ],
            },
            {
              id: 'packaging',
              label: 'Interactive Packaging',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product: Interactive Packaging',
                },
                { type: 'set-base-price', value: 250 }, // Base setup fee
              ],
            },
            {
              id: 'posters',
              label: 'Interactive Posters/Signage',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product: Interactive Posters/Signage',
                },
                { type: 'set-base-price', value: 200 }, // Base setup fee
              ],
            },
            {
              id: 'clothing',
              label: 'Interactive Clothing',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Product: Interactive Clothing',
                },
                { type: 'set-base-price', value: 300 }, // Base setup fee
              ],
            },
          ],
        },
        {
          id: 'interactionType',
          type: 'single-select',
          label: 'What type of interaction do you want?',
          options: [
            {
              id: 'qr',
              label: 'QR Code',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: QR Code',
                },
                { type: 'add-price', value: 0 }, // No additional cost for QR
              ],
            },
            {
              id: 'nfc',
              label: 'NFC Tag',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: NFC Tag',
                },
                { type: 'add-price', value: 50 }, // Additional setup for NFC
              ],
            },
            {
              id: 'ar-marker',
              label: 'AR Marker',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interaction: AR Marker',
                },
                { type: 'add-price', value: 100 }, // Additional setup for AR markers
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'quantity',
      title: 'Quantity',
      questions: [
        {
          id: 'businessCardQuantity',
          type: 'numeric',
          label: 'Number of Business Cards',
          min: 25,
          max: 10000,
          dependsOn: {
            questionId: 'merchandiseType',
            value: 'business-cards',
          },
          effects: [
            {
              type: 'add-feature',
              value: 'Business Card Quantity',
            },
            {
              type: 'add-price',
              value: 1.5, // £1.50 per card
              multiplier: 'businessCardQuantity',
              name: 'Business Cards Cost',
            },
          ],
        },
        {
          id: 'brochureQuantity',
          type: 'numeric',
          label: 'Number of Brochures/Flyers',
          min: 50,
          max: 10000,
          dependsOn: {
            questionId: 'merchandiseType',
            value: 'brochures',
          },
          effects: [
            {
              type: 'add-feature',
              value: 'Brochure Quantity',
            },
            {
              type: 'add-price',
              value: 0.75, // £0.75 per brochure
              multiplier: 'brochureQuantity',
              name: 'Brochures Cost',
            },
          ],
        },
        {
          id: 'packagingQuantity',
          type: 'numeric',
          label: 'Number of Packaging Units',
          min: 100,
          max: 10000,
          dependsOn: {
            questionId: 'merchandiseType',
            value: 'packaging',
          },
          effects: [
            {
              type: 'add-feature',
              value: 'Packaging Quantity',
            },
            {
              type: 'add-price',
              value: 1.25, // £1.25 per packaging unit
              multiplier: 'packagingQuantity',
              name: 'Packaging Cost',
            },
          ],
        },
        {
          id: 'posterQuantity',
          type: 'numeric',
          label: 'Number of Posters/Signs',
          min: 10,
          max: 1000,
          dependsOn: {
            questionId: 'merchandiseType',
            value: 'posters',
          },
          effects: [
            {
              type: 'add-feature',
              value: 'Poster Quantity',
            },
            {
              type: 'add-price',
              value: 5, // £5 per poster
              multiplier: 'posterQuantity',
              name: 'Posters Cost',
            },
          ],
        },
        {
          id: 'clothingQuantity',
          type: 'numeric',
          label: 'Number of Clothing Items',
          min: 25,
          max: 1000,
          dependsOn: {
            questionId: 'merchandiseType',
            value: 'clothing',
          },
          effects: [
            {
              type: 'add-feature',
              value: 'Clothing Quantity',
            },
            {
              type: 'add-price',
              value: 10, // £10 per clothing item
              multiplier: 'clothingQuantity',
              name: 'Clothing Cost',
            },
          ],
        },
      ],
    },
    {
      id: 'digital-experience',
      title: 'Digital Experience',
      questions: [
        {
          id: 'experienceType',
          type: 'single-select',
          label: 'What type of digital experience do you want?',
          options: [
            {
              id: 'basic',
              label: 'Basic (Link to Website/Info)',
              effects: [
                { type: 'add-feature', value: 'Experience: Basic' },
                { type: 'add-price', value: 0 }, // No additional cost
              ],
            },
            {
              id: 'ar-viewer',
              label: 'AR Viewer (3D Model/Animation)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Experience: AR Viewer',
                },
                { type: 'add-price', value: 300 }, // Additional setup
              ],
            },
            {
              id: 'interactive',
              label: 'Interactive Experience (Mini-Game/Quiz)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Experience: Interactive',
                },
                { type: 'add-price', value: 500 }, // Additional setup
              ],
            },
            {
              id: 'custom',
              label: 'Custom Experience',
              effects: [
                { type: 'add-feature', value: 'Experience: Custom' },
                { type: 'add-price', value: 750 }, // Additional setup
              ],
            },
          ],
        },
        {
          id: 'have3DContent',
          type: 'yes-no',
          label: 'Do you already have 3D content?',
          dependsOn: {
            questionId: 'experienceType',
            value: 'ar-viewer',
          },
          effects: [
            {
              type: 'add-feature',
              value: 'Has Existing 3D Content',
              condition: { answer: true },
            },
            {
              type: 'add-feature',
              value: 'Needs 3D Content Creation',
              condition: { answer: false },
            },
            {
              type: 'add-commission',
              value: '3D Content Creation',
              condition: { answer: false },
            },
            {
              type: 'add-price',
              value: 400, // Additional cost for 3D creation
              condition: { answer: false },
            },
          ],
        },
        {
          id: 'analytics',
          type: 'yes-no',
          label: 'Do you need analytics tracking?',
          effects: [
            {
              type: 'add-feature',
              value: 'Analytics Tracking Included',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 150, // Additional cost for analytics
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'customBranding',
          type: 'yes-no',
          label:
            'Do you need custom branding on the digital experience?',
          effects: [
            {
              type: 'add-feature',
              value: 'Custom Branding Included',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 100, // Additional cost for custom branding
              condition: { answer: true },
            },
          ],
        },
      ],
    },
    {
      id: 'production-details',
      title: 'Production Details',
      questions: [
        {
          id: 'deliveryTimeframe',
          type: 'single-select',
          label: 'What is your delivery timeframe?',
          options: [
            {
              id: 'standard',
              label: 'Standard (2-3 weeks)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Delivery: Standard (2-3 weeks)',
                },
                { type: 'add-price', value: 0 }, // No additional cost
              ],
            },
            {
              id: 'expedited',
              label: 'Expedited (1-2 weeks)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Delivery: Expedited (1-2 weeks)',
                },
                { type: 'add-price', value: 200 }, // Expedited fee
              ],
            },
            {
              id: 'rush',
              label: 'Rush (3-5 business days)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Delivery: Rush (3-5 business days)',
                },
                { type: 'add-price', value: 350 }, // Rush fee
              ],
            },
          ],
        },
        {
          id: 'haveDesigns',
          type: 'yes-no',
          label:
            'Do you already have designs for the physical items?',
          effects: [
            {
              type: 'add-feature',
              value: 'Has Existing Designs',
              condition: { answer: true },
            },
            {
              type: 'add-feature',
              value: 'Needs Design Services',
              condition: { answer: false },
            },
            {
              type: 'add-commission',
              value: 'Design Services',
              condition: { answer: false },
            },
            {
              type: 'add-price',
              value: 250, // Design fee
              condition: { answer: false },
            },
          ],
        },
        {
          id: 'needInstallation',
          type: 'yes-no',
          label: 'Do you need installation or setup services?',
          effects: [
            {
              type: 'add-feature',
              value: 'Installation Services Required',
              condition: { answer: true },
            },
            {
              type: 'add-commission',
              value: 'Installation Services',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 300, // Installation fee
              condition: { answer: true },
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
          id: 'projectTitle',
          type: 'text',
          label: 'Project Title',
          effects: [{ type: 'add-feature', value: 'Project Title' }],
        },
        {
          id: 'projectDescription',
          type: 'text',
          multiline: true,
          rows: 4,
          label: 'Project Description',
          placeholder:
            'Please describe your project goals and requirements...',
          effects: [
            { type: 'add-feature', value: 'Project Description' },
          ],
        },
        {
          id: 'targetAudience',
          type: 'text',
          label: 'Target Audience',
          required: false,
          placeholder: 'Who will be using these items?',
          effects: [
            { type: 'add-feature', value: 'Target Audience' },
          ],
        },
        {
          id: 'additionalRequirements',
          type: 'text',
          multiline: true,
          rows: 3,
          label: 'Additional Requirements',
          required: false,
          placeholder:
            'Any other requirements or special considerations...',
          effects: [
            { type: 'add-feature', value: 'Additional Requirements' },
          ],
        },
      ],
    },
  ],
};

export default merchandiseSchema;
