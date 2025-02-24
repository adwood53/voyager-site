/**
 * File: src/app/blog/page.js
 *
 * Shows a blog listing with a normal (non-wrapped) "Read More" button.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For onClick
import Image from 'next/image';
import { groq } from 'next-sanity';
import { sanityClient } from '@/src/lib/sanity';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from '@heroui/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import UniversalNavbar from '@/src/app/components/UniversalNavbar';
import UniversalFooter from '@/src/app/components/UniversalFooter';

export default function BlogListingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const query = groq`
      *[_type == "post"] | order(publishedAt desc){
        title,
        excerpt,
        "slug": slug.current,
        mainImage {
          asset->{
            url
          }
        },
        publishedAt
      }
    `;
    sanityClient.fetch(query).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  function handleReadMore(slug) {
    // Navigate to the post’s slug
    router.push(`/blog/${slug}`);
  }

  return (
    <>
      <UniversalNavbar variant="dark" />

      <section className="bg-darkPrimary text-textLight py-10 pt-16 text-center">
        <h1 className="text-4xl font-heading text-background mb-2">
          OUR BLOG
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Discover the latest news, insights, and stories related to
          social innovation and local initiatives.
        </p>
      </section>

      <section className="bg-lightPrimary text-darkPrimary py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && <p>Loading posts...</p>}
          {!loading && posts.length === 0 && (
            <p>No posts available.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="flex flex-col bg-white shadow-lg
                           hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                {/* Image */}
                {post.mainImage?.asset?.url && (
                  <CardHeader className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                    />
                  </CardHeader>
                )}

                <CardBody className="flex-1 p-4">
                  <h3 className="text-xl font-semibold text-darkPrimary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {post.excerpt ||
                      'Dive into our latest article for more insights...'}
                  </p>
                </CardBody>

                <CardFooter className="p-4 bg-gray-50 flex justify-end">
                  {/* Instead of Link, we do onClick */}
                  <Button
                    type="button"
                    onClick={() => handleReadMore(post.slug)}
                    className="bg-primary text-background hover:bg-accent
                               transition-colors px-4 py-2 flex items-center gap-2"
                  >
                    Read More
                    <ArrowRightIcon className="h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <UniversalFooter variant="dark" />
    </>
  );
}
