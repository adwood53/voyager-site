'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/src/lib/sanity';
import BlogContent from '@/src/app/components/blog/BlogContent';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      if (!params?.slug) {
        if (isMounted) {
          setError(new Error('No slug parameter provided'));
          setLoading(false);
        }
        return;
      }

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

        const postData = await sanityClient.fetch(query, {
          slug: params.slug,
        });

        if (isMounted) {
          if (postData) {
            setPost(postData);
          } else {
            setError(new Error('Post not found'));
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchPost();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [params?.slug]);

  // Render loading state while fetching data
  if (loading) {
    return (
      <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
        <Navbar />
        <div className="pt-16">
          <BlogContent loading={true} />
        </div>
        <Footer />
      </main>
    );
  }

  // Render error state if there was an error
  if (error) {
    console.error('Error in BlogPost component:', error);
    return (
      <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
        <Navbar />
        <div className="container-voyager py-8 pt-16">
          <div className="card-voyager bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-40 w-full p-8 rounded-lg">
            <h1 className="text-2xl text-primary mb-4">
              Something went wrong
            </h1>
            <p className="text-textLight opacity-80">
              We couldn't load this blog post. Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />
      <BlogContent post={post} />
      <Footer />
    </main>
  );
}
