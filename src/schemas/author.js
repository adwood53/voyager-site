// schemas/author.js
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    // Full legal name or brand name
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The author’s full name or primary alias.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),

    // A handle or short reference, if needed
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used for internal linking or author pages (if you have them).',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // A short tagline or role, e.g. "Creative Technologist," "Journalist," etc.
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description:
        'Short descriptor of the author’s role. E.g., "Lead Writer," "Freelance Journalist."',
      validation: (Rule) => Rule.max(60),
    }),

    // If you want to store pronouns or more inclusive info
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      description:
        'Optional field for pronouns (e.g., she/her, they/them).',
      validation: (Rule) => Rule.max(20),
    }),

    // A larger block-based bio
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'A rich-text field to describe the author’s background, interests, or story.',
    }),

    // A single image field for the author’s avatar or profile
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      description: 'Upload the author’s headshot or an avatar image.',
      options: {
        hotspot: true,
      },
      fields: [
        // Provide a field for alt text
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            'Short description of the image for accessibility.',
        },
      ],
    }),

    // Optional social links array
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineField({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              description: 'E.g., Twitter, LinkedIn, GitHub, etc.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description:
                'Link to the author’s profile on that platform.',
              validation: (Rule) =>
                Rule.uri({ scheme: ['http', 'https'] }),
            },
          ],
        }),
      ],
      description: 'A list of social media or personal site links.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
});
