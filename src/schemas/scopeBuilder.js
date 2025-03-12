// src/schemas/scopeBuilder.js
const scopeBuilderSchema = {
  id: 'scope-builder',
  title: 'Project Scope Builder',
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
      id: 'project-basics',
      title: 'Project Basics',
      questions: [
        {
          id: 'projectGoal',
          type: 'single-select',
          label: 'What is the primary goal of your project?',
          helpText:
            'Select the most important outcome you want to achieve.',
          options: [
            {
              id: 'marketing',
              label: 'Marketing & Brand Awareness',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Marketing & Brand Awareness',
                },
              ],
            },
            {
              id: 'sales',
              label: 'Sales & Conversion',
              effects: [
                { type: 'add-feature', value: 'Sales & Conversion' },
              ],
            },
            {
              id: 'training',
              label: 'Training & Education',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Training & Education',
                },
              ],
            },
            {
              id: 'entertainment',
              label: 'Entertainment & Engagement',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Entertainment & Engagement',
                },
              ],
            },
          ],
        },
        {
          id: 'audience',
          type: 'single-select',
          label: 'Who is your target audience?',
          helpText:
            'Understanding your audience helps determine the most effective approach.',
          options: [
            {
              id: 'consumers',
              label: 'General Consumers',
              effects: [
                {
                  type: 'add-feature',
                  value: 'General Consumer Audience',
                },
              ],
            },
            {
              id: 'businesses',
              label: 'Business Clients',
              effects: [
                { type: 'add-feature', value: 'Business Audience' },
              ],
            },
            {
              id: 'employees',
              label: 'Internal Employees',
              effects: [
                { type: 'add-feature', value: 'Employee Audience' },
              ],
            },
            {
              id: 'students',
              label: 'Students/Learners',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Student/Learner Audience',
                },
              ],
            },
          ],
        },
        {
          id: 'budget',
          type: 'single-select',
          label: 'What is your approximate budget range?',
          helpText:
            'This helps us recommend solutions within your budget constraints.',
          options: [
            {
              id: 'small',
              label: '£1,000 - £5,000',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Budget: £1,000 - £5,000',
                },
              ],
            },
            {
              id: 'medium',
              label: '£5,000 - £15,000',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Budget: £5,000 - £15,000',
                },
              ],
            },
            {
              id: 'large',
              label: '£15,000 - £50,000',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Budget: £15,000 - £50,000',
                },
              ],
            },
            {
              id: 'enterprise',
              label: '£50,000+',
              effects: [
                { type: 'add-feature', value: 'Budget: £50,000+' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'technology-preferences',
      title: 'Technology Preferences',
      questions: [
        {
          id: 'preferredTech',
          type: 'single-select',
          label: 'Which technology are you most interested in?',
          helpText:
            "Select the technology you're most drawn to for your project.",
          options: [
            {
              id: 'ar',
              label: 'Augmented Reality (AR)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Technology Preference: AR',
                },
              ],
            },
            {
              id: 'vr',
              label: 'Virtual Reality (VR)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Technology Preference: VR',
                },
              ],
            },
            {
              id: 'mr',
              label: 'Mixed Reality (MR)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Technology Preference: MR',
                },
              ],
            },
            {
              id: 'unsure',
              label: 'Not Sure / Need Guidance',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Technology Preference: Needs Guidance',
                },
              ],
            },
          ],
        },
        {
          id: 'deviceTarget',
          type: 'single-select',
          label: 'Which devices should your experience target?',
          helpText:
            'Select the primary device type for your audience.',
          options: [
            {
              id: 'mobile',
              label: 'Mobile Phones/Tablets',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Target Device: Mobile',
                },
              ],
            },
            {
              id: 'headset',
              label: 'VR Headsets',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Target Device: VR Headset',
                },
              ],
            },
            {
              id: 'desktop',
              label: 'Desktop/Laptop',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Target Device: Desktop',
                },
              ],
            },
            {
              id: 'multi',
              label: 'Multiple Platforms',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Target Device: Multi-platform',
                },
              ],
            },
          ],
        },
        {
          id: 'contentAvailability',
          type: 'yes-no',
          label: 'Do you already have 3D content or assets?',
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
          ],
        },
      ],
    },
    {
      id: 'project-requirements',
      title: 'Project Requirements',
      questions: [
        {
          id: 'timeline',
          type: 'single-select',
          label: 'What is your project timeline?',
          helpText: 'When do you need the project completed by?',
          options: [
            {
              id: 'urgent',
              label: 'Urgent (< 1 month)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Timeline: Urgent (< 1 month)',
                },
              ],
            },
            {
              id: 'standard',
              label: 'Standard (1-3 months)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Timeline: Standard (1-3 months)',
                },
              ],
            },
            {
              id: 'flexible',
              label: 'Flexible (3+ months)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Timeline: Flexible (3+ months)',
                },
              ],
            },
          ],
        },
        {
          id: 'interactivity',
          type: 'single-select',
          label: 'What level of interactivity do you need?',
          helpText:
            'How much will users be able to interact with your experience?',
          options: [
            {
              id: 'low',
              label: 'Basic (Viewing/Simple Interactions)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interactivity: Basic',
                },
              ],
            },
            {
              id: 'medium',
              label: 'Moderate (Multiple Interactive Elements)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interactivity: Moderate',
                },
              ],
            },
            {
              id: 'high',
              label: 'Advanced (Complex Interactions/Gamification)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Interactivity: Advanced',
                },
                {
                  type: 'add-commission',
                  value: 'Advanced Interactive Elements',
                },
              ],
            },
          ],
        },
        {
          id: 'dataCollection',
          type: 'yes-no',
          label: 'Do you need to collect user data or analytics?',
          effects: [
            {
              type: 'add-feature',
              value: 'Requires Data Collection',
              condition: { answer: true },
            },
            {
              type: 'add-commission',
              value: 'Analytics Integration',
              condition: { answer: true },
            },
          ],
        },
      ],
    },
    {
      id: 'distribution',
      title: 'Distribution & Deployment',
      questions: [
        {
          id: 'distribution',
          type: 'single-select',
          label: 'How do you plan to distribute your experience?',
          helpText:
            'Select the primary method for delivering your experience to users.',
          options: [
            {
              id: 'web',
              label: 'Web-based (No Download Required)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Distribution: Web-based',
                },
              ],
            },
            {
              id: 'app',
              label: 'Dedicated App (App Store/Play Store)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Distribution: Dedicated App',
                },
              ],
            },
            {
              id: 'kiosk',
              label: 'On-site Kiosk/Installation',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Distribution: On-site Kiosk',
                },
              ],
            },
            {
              id: 'unsure',
              label: 'Not Sure / Need Recommendations',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Distribution: Needs Guidance',
                },
              ],
            },
          ],
        },
        {
          id: 'physicalElements',
          type: 'yes-no',
          label:
            'Do you need physical elements (e.g., QR codes, NFC tags)?',
          effects: [
            {
              type: 'add-feature',
              value: 'Requires Physical Elements',
              condition: { answer: true },
            },
            {
              type: 'add-commission',
              value: 'Physical Elements Production',
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'eventBased',
          type: 'yes-no',
          label: 'Is this for a specific event or ongoing use?',
          helpText:
            'Yes = Specific event, No = Ongoing/long-term use',
          effects: [
            {
              type: 'add-feature',
              value: 'For Specific Event',
              condition: { answer: true },
            },
            {
              type: 'add-feature',
              value: 'For Ongoing Use',
              condition: { answer: false },
            },
          ],
        },
      ],
    },
    {
      id: 'additional-info',
      title: 'Additional Information',
      questions: [
        {
          id: 'projectDescription',
          type: 'text',
          multiline: true,
          rows: 4,
          label: 'Please describe your project in more detail',
          helpText:
            'Include any specific requirements or ideas you have.',
          placeholder: 'Enter your project description here...',
          effects: [
            {
              type: 'add-feature',
              value: 'Has Detailed Project Description',
            },
          ],
        },
        {
          id: 'previousExperience',
          type: 'yes-no',
          label: 'Have you created AR/VR experiences before?',
          effects: [
            {
              type: 'add-feature',
              value: 'Has Previous AR/VR Experience',
              condition: { answer: true },
            },
            {
              type: 'add-feature',
              value: 'New to AR/VR',
              condition: { answer: false },
            },
          ],
        },
        {
          id: 'additionalRequests',
          type: 'text',
          multiline: true,
          rows: 3,
          label: 'Any other requirements or questions?',
          required: false,
          placeholder: 'Optional: Any other details or questions...',
          effects: [],
        },
      ],
    },
  ],
  recommendations: {
    logic: 'score-based',
    products: [
      {
        id: 'ar-experience',
        name: 'AR Marketing Experience',
        description:
          'An augmented reality experience designed to boost brand awareness and engagement through interactive elements overlaid on the real world.',
        conditions: [
          {
            questionId: 'projectGoal',
            value: 'marketing',
            weight: 2,
          },
          { questionId: 'preferredTech', value: 'ar', weight: 3 },
          { questionId: 'audience', value: 'consumers', weight: 1 },
          { questionId: 'deviceTarget', value: 'mobile', weight: 2 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 5, tier: 2 },
          threshold3: { score: 7, tier: 3 },
        },
      },
      {
        id: 'vr-experience',
        name: 'VR Immersive Experience',
        description:
          'A fully immersive virtual reality environment that creates memorable experiences for users, ideal for events, training, or deep engagement.',
        conditions: [
          { questionId: 'preferredTech', value: 'vr', weight: 3 },
          { questionId: 'deviceTarget', value: 'headset', weight: 2 },
          { questionId: 'interactivity', value: 'high', weight: 1 },
          {
            questionId: 'projectGoal',
            value: 'entertainment',
            weight: 1,
          },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 5, tier: 2 },
          threshold3: { score: 6, tier: 3 },
        },
      },
      {
        id: 'web-ar',
        name: 'Web-Based AR Solution',
        description:
          'A lightweight, accessible AR experience delivered through web browsers with no app download required, perfect for wide distribution.',
        conditions: [
          { questionId: 'distribution', value: 'web', weight: 3 },
          { questionId: 'preferredTech', value: 'ar', weight: 2 },
          { questionId: 'timeline', value: 'urgent', weight: 1 },
          { questionId: 'budget', value: 'small', weight: 1 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 5, tier: 2 },
          threshold3: { score: 6, tier: 3 },
        },
      },
      {
        id: 'interactive-ar',
        name: 'Interactive AR Product Visualization',
        description:
          'An augmented reality solution that allows customers to visualize and interact with products in their own environment before purchasing.',
        conditions: [
          { questionId: 'projectGoal', value: 'sales', weight: 3 },
          { questionId: 'preferredTech', value: 'ar', weight: 2 },
          { questionId: 'interactivity', value: 'medium', weight: 1 },
          { questionId: 'deviceTarget', value: 'mobile', weight: 1 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 5, tier: 2 },
          threshold3: { score: 6, tier: 3 },
        },
      },
      {
        id: 'vr-training',
        name: 'VR Training Simulation',
        description:
          'A virtual reality training environment that allows employees to practice skills in a safe, controlled, and immersive setting.',
        conditions: [
          { questionId: 'projectGoal', value: 'training', weight: 3 },
          { questionId: 'preferredTech', value: 'vr', weight: 2 },
          { questionId: 'audience', value: 'employees', weight: 2 },
          { questionId: 'interactivity', value: 'high', weight: 1 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 6, tier: 2 },
          threshold3: { score: 7, tier: 3 },
        },
      },
      {
        id: 'event-experience',
        name: 'Event-Based Immersive Experience',
        description:
          'A custom AR/VR solution designed specifically for events, exhibitions, or trade shows to create memorable brand interactions.',
        conditions: [
          { questionId: 'eventBased', value: true, weight: 3 },
          { questionId: 'physicalElements', value: true, weight: 2 },
          {
            questionId: 'projectGoal',
            value: 'marketing',
            weight: 1,
          },
          { questionId: 'audience', value: 'consumers', weight: 1 },
        ],
        minScore: 3,
        tierMapping: {
          threshold1: { score: 3, tier: 1 },
          threshold2: { score: 5, tier: 2 },
          threshold3: { score: 7, tier: 3 },
        },
      },
    ],
  },
};

export default scopeBuilderSchema;
