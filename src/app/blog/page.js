'use client';
import { useState, useEffect } from 'react';
import { sanityClient } from '@/src/lib/sanity';
import BlogList from '@/src/app/components/blog/BlogList';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsData = await sanityClient.fetch(
          `*[_type == "post"] | order(publishedAt desc){
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            mainImage{asset->{url}},
            "categories": categories[]->{ _id, title },
            "author": author->{ _id, name, profileImage{asset->{url}} }
          }`
        );

        // Process the posts data
        if (postsData) {
          const processedPosts = postsData.map((post) => {
            // Format slug
            if (post.slug) {
              post.slug = post.slug.current;
            }

            // Format mainImage URL if it exists
            if (post.mainImage?.asset?.url) {
              post.mainImage = post.mainImage.asset.url;
            }

            // Format author profile image if it exists
            if (post.author?.profileImage?.asset?.url) {
              post.author.profileImage =
                post.author.profileImage.asset.url;
            }

            return post;
          });

          setPosts(processedPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />
      <BlogList posts={posts} />
      <Footer />
    </main>
  );
}
