// src/app/sitemap.js
import { sanityClient } from '@/src/lib/sanity';

export default async function sitemap() {
  const baseUrl = 'https://www.voyagervrlab.co.uk';

  // Get all blog posts for dynamic sitemap entries
  const posts = await getAllPosts();
  const blogPostsEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt) || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    // Core pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-code`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // Include all blog posts
    ...blogPostsEntries,
  ];
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
