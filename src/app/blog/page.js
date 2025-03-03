// src/app/blog/page.js
import { sanityClient } from '@/src/lib/sanity';
import BlogList from '@/src/app/components/blog/BlogList';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

// Function to fetch all blog posts
async function getAllPosts() {
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "mainImage": mainImage.asset->url,
        "categories": categories[]->{ _id, title },
        "author": author->{ 
          _id, 
          name, 
          "profileImage": profileImage.asset->url 
        }
      }`
    );
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Server component for blog page
export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />
      <BlogList posts={posts} />
      <Footer />
    </main>
  );
}
