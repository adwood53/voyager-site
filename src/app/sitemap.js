// src/app/sitemap.js
import { sanityClient } from '@/src/lib/sanity';

export default async function sitemap() {
  const baseUrl = 'https://www.voyagervrlab.co.uk';
  const lastModified = new Date();

  // Get all blog posts for dynamic sitemap entries
  const posts = await getAllPosts();
  const blogPostsEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt) || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Essential core pages with correct priorities
  const corePages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-code`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/bug-report`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...corePages, ...blogPostsEntries];
}

// Helper function to get all blog posts
async function getAllPosts() {
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        "slug": slug.current,
        publishedAt
      }`
    );
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}
