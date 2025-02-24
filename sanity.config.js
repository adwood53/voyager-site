// sanity.config.js
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import post from './src/schemas/post';
import author from './src/schemas/author';
import catagory from './src/schemas/catagory';

console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Social Innovation People Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Ensure this is correct
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: [post, author, catagory],
  },
});
