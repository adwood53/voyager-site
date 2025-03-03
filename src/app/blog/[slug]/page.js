// src/app/blog/[slug]/page.js
import { sanityClient } from '@/src/lib/sanity';
import BlogContent from '@/src/app/components/blog/BlogContent';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

// This makes it a Server Component
export const dynamicParams = true;

// Function to fetch blog post data
async function getPost(slug) {
  try {
    // Query for the post by slug
    const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      publishedAt,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "asset": {
            "_id": asset->_id,
            "_ref": asset._ref,
            "_type": asset._type,
            "url": asset->url
          }
        }
      },
      "categories": categories[]->{ _id, title },
      "author": author->{ 
        _id, 
        name, 
        "profileImage": profileImage.asset->url 
      }
    }`;

    const post = await sanityClient.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />
      <BlogContent post={post} />
      <Footer />
    </main>
  );
}
