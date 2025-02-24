// schemas/category.js
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The name of this category (e.g., "Technology", "Community").',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used for referencing or category pages in your app.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // A short or extended description of this category’s scope
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'A more detailed explanation of what falls under this category.',
    }),

    // If you want an image or icon that visually represents the category
    defineField({
      name: 'icon',
      title: 'Icon / Image',
      type: 'image',
      description:
        'Optional image or icon used to represent this category.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description:
            'Short description of the icon for accessibility.',
        },
      ],
    }),

    // If you want to specify a color for each category, e.g. for styling
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description:
        'Provide a hex code or CSS color for styling (e.g., "#FF3C00").',
      validation: (Rule) =>
        Rule.custom((color) => {
          if (!color) return true;
          // Basic hex color test (optional)
          const hexRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
          return hexRegex.test(color)
            ? true
            : 'Please enter a valid hex color code, e.g. #FF3C00.';
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
});
