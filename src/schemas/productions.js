// src/schemas/productions.js
const productionsSchema = {
  id: 'productions',
  title: 'Productions Calculator',
  purpose: 'pricing',
  actions: {
    submitToCRM: true,
    exportToPDF: true,
    showRecommendations: false,
  },
  description:
    'Calculate costs for studio productions and equipment rentals.',
  sections: [
    {
      id: 'studio-booking',
      title: 'Studio Booking',
      questions: [
        {
          id: 'studioNeeded',
          type: 'yes-no',
          label: 'Do you need to book our studio space?',
          effects: [
            {
              type: 'add-feature',
              value: 'Studio Booking Required',
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'bookingDuration',
          type: 'numeric',
          label: 'How many hours do you need the studio?',
          min: 1,
          max: 48,
          dependsOn: { questionId: 'studioNeeded', value: true },
          effects: [
            { type: 'add-feature', value: 'Studio Hours' },
            {
              type: 'add-price',
              value: 125, // £125 per hour
              condition: { minValue: 1 },
            },
          ],
        },
        {
          id: 'bookingDate',
          type: 'text',
          label: 'Preferred booking date',
          dependsOn: { questionId: 'studioNeeded', value: true },
          helpText:
            'Please note this is a preferred date, we will confirm availability.',
          effects: [{ type: 'add-feature', value: 'Preferred Date' }],
        },
        {
          id: 'outOfHours',
          type: 'yes-no',
          label:
            'Do you need out-of-hours access (before 9am or after 5pm)?',
          dependsOn: { questionId: 'studioNeeded', value: true },
          effects: [
            {
              type: 'add-feature',
              value: 'Out-of-hours Access Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 100, // £100 flat fee for out-of-hours
              condition: { answer: true },
            },
          ],
        },
      ],
    },
    {
      id: 'equipment',
      title: 'Equipment',
      questions: [
        {
          id: 'cameraPackage',
          type: 'single-select',
          label: 'Which camera package do you need?',
          options: [
            {
              id: 'none',
              label: 'None',
              effects: [],
            },
            {
              id: 'basic',
              label: 'Basic (1080p DSLR, Basic Accessories)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Camera: Basic Package',
                },
                { type: 'add-price', value: 150 },
              ],
            },
            {
              id: 'standard',
              label: 'Standard (4K Mirrorless, Full Accessories)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Camera: Standard Package',
                },
                { type: 'add-price', value: 250 },
              ],
            },
            {
              id: 'professional',
              label: 'Professional (Cinema Camera, Full Kit)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Camera: Professional Package',
                },
                { type: 'add-price', value: 450 },
              ],
            },
          ],
        },
        {
          id: 'lightingNeeded',
          type: 'yes-no',
          label: 'Do you need lighting equipment?',
          effects: [
            {
              type: 'add-feature',
              value: 'Lighting Equipment Required',
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'lightingPackage',
          type: 'single-select',
          label: 'Which lighting package do you need?',
          dependsOn: { questionId: 'lightingNeeded', value: true },
          options: [
            {
              id: 'basic',
              label: 'Basic (Key Light + Fill)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Lighting: Basic Package',
                },
                { type: 'add-price', value: 100 },
              ],
            },
            {
              id: 'standard',
              label: 'Standard (3-Point Lighting Setup)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Lighting: Standard Package',
                },
                { type: 'add-price', value: 200 },
              ],
            },
            {
              id: 'advanced',
              label: 'Advanced (Full Studio Lighting)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Lighting: Advanced Package',
                },
                { type: 'add-price', value: 350 },
              ],
            },
          ],
        },
        {
          id: 'audioNeeded',
          type: 'yes-no',
          label: 'Do you need audio equipment?',
          effects: [
            {
              type: 'add-feature',
              value: 'Audio Equipment Required',
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'audioPackage',
          type: 'single-select',
          label: 'Which audio package do you need?',
          dependsOn: { questionId: 'audioNeeded', value: true },
          options: [
            {
              id: 'basic',
              label: 'Basic (Shotgun Mic)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Audio: Basic Package',
                },
                { type: 'add-price', value: 75 },
              ],
            },
            {
              id: 'standard',
              label: 'Standard (Shotgun + Wireless Lav)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Audio: Standard Package',
                },
                { type: 'add-price', value: 150 },
              ],
            },
            {
              id: 'advanced',
              label: 'Advanced (Full Audio Suite)',
              effects: [
                {
                  type: 'add-feature',
                  value: 'Audio: Advanced Package',
                },
                { type: 'add-price', value: 250 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'personnel',
      title: 'Personnel',
      questions: [
        {
          id: 'cameraOperator',
          type: 'yes-no',
          label: 'Do you need a camera operator?',
          effects: [
            {
              type: 'add-feature',
              value: 'Camera Operator Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 300, // £300 per day
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'lightingTechnician',
          type: 'yes-no',
          label: 'Do you need a lighting technician?',
          effects: [
            {
              type: 'add-feature',
              value: 'Lighting Technician Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 250, // £250 per day
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'audioEngineer',
          type: 'yes-no',
          label: 'Do you need an audio engineer?',
          effects: [
            {
              type: 'add-feature',
              value: 'Audio Engineer Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 250, // £250 per day
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'director',
          type: 'yes-no',
          label: 'Do you need a director?',
          effects: [
            {
              type: 'add-feature',
              value: 'Director Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 400, // £400 per day
              condition: { answer: true },
            },
          ],
        },
      ],
    },
    {
      id: 'post-production',
      title: 'Post-Production',
      questions: [
        {
          id: 'editingNeeded',
          type: 'yes-no',
          label: 'Do you need video editing services?',
          effects: [
            {
              type: 'add-feature',
              value: 'Video Editing Required',
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'editingHours',
          type: 'numeric',
          label: 'Estimated hours of editing needed',
          dependsOn: { questionId: 'editingNeeded', value: true },
          min: 1,
          max: 100,
          effects: [
            { type: 'add-feature', value: 'Editing Hours' },
            {
              type: 'add-price',
              value: 65, // £65 per hour
              condition: { minValue: 1 },
            },
          ],
        },
        {
          id: 'colorGrading',
          type: 'yes-no',
          label: 'Do you need color grading?',
          effects: [
            {
              type: 'add-feature',
              value: 'Color Grading Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 200, // £200 flat fee
              condition: { answer: true },
            },
          ],
        },
        {
          id: 'audioMixing',
          type: 'yes-no',
          label: 'Do you need audio mixing and mastering?',
          effects: [
            {
              type: 'add-feature',
              value: 'Audio Mixing Required',
              condition: { answer: true },
            },
            {
              type: 'add-price',
              value: 150, // £150 flat fee
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
          placeholder: 'Please describe your project...',
          effects: [
            { type: 'add-feature', value: 'Project Description' },
          ],
        },
        {
          id: 'deliveryDate',
          type: 'text',
          label: 'Required Delivery Date',
          effects: [{ type: 'add-feature', value: 'Delivery Date' }],
        },
        {
          id: 'additionalRequirements',
          type: 'text',
          multiline: true,
          rows: 3,
          label: 'Additional Requirements',
          required: false,
          placeholder:
            'Any other requirements we should know about...',
          effects: [
            { type: 'add-feature', value: 'Additional Requirements' },
          ],
        },
      ],
    },
  ],
};

export default productionsSchema;
