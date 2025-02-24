/**
 * File: src/app/blog/[slug]/page.js
 *
 * Single-post page with a "Back to Blog" button that
 * calls onClick => router.push('/blog').
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { groq } from 'next-sanity';
import { sanityClient } from '@/src/lib/sanity';

import Image from 'next/image';
import { PortableText } from '@portabletext/react';

import {
  Avatar,
  Button,
  Chip,
  Card,
  CardBody,
  CardFooter,
} from '@heroui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import UniversalNavbar from '@/src/app/components/UniversalNavbar';
import UniversalFooter from '@/src/app/components/UniversalFooter';
import ScrollDownButton from '@/src/app/components/ScrollDownButton';
import { portableTextComponents } from '@/src/app/blog/blogComponents';
import { useRouter } from 'next/navigation';

export default function SinglePostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // We'll use this for Back to Blog

  useEffect(() => {
    if (!slug) return;
    const query = groq`
      *[_type == "post" && slug.current == $slug][0]{
        title,
        publishedAt,
        excerpt,
        mainImage {
          asset->{
            url
          },
          alt
        },
        body,
        categories[]->{
          _id,
          title
        },
        author->{
          name,
          role,
          profileImage {
            asset->{
              url
            }
          }
        }
      }
    `;
    sanityClient
      .fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  function handleBackClick() {
    // Navigate back to /blog
    router.push('/blog');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkPrimary text-textLight">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-darkPrimary text-textLight px-4">
        <h2 className="text-3xl font-heading mb-4">Post Not Found</h2>
        <p className="mb-6">
          We couldn’t find the post you’re looking for.
        </p>
        <Button
          type="button"
          className="bg-accent text-darkPrimary hover:bg-primary
                     transition-colors px-5 py-3 flex items-center gap-2 font-semibold"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Blog
        </Button>
      </div>
    );
  }

  const {
    title,
    publishedAt,
    excerpt,
    mainImage,
    body,
    categories,
    author,
  } = post;

  const dateStr = publishedAt
    ? new Date(publishedAt).toLocaleDateString()
    : null;

  const authorName = author?.name || 'Unknown Author';
  const authorRole = author?.role || '';
  const authorImageUrl =
    author?.profileImage?.asset?.url || '/placeholder-avatar.jpg';

  const nextSectionId = 'post-content';

  return (
    <>
      {/* Dark hero */}
      <section className="relative md:h-screen h-auto bg-darkPrimary text-textLight overflow-hidden flex flex-col">
        <UniversalNavbar variant="dark" />

        {/* This container will fill remaining space and center items */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 w-full gap-8 items-center justify-center px-4 py-8">
          {/* LEFT side: col-span-4 */}
          <div className="md:col-span-4 flex flex-col justify-center items-center text-center space-y-6">
            <h1 className="font-heading text-3xl md:text-5xl leading-tight">
              {title}
            </h1>

            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <Avatar
                  size="xs"
                  src={authorImageUrl}
                  alt={authorName}
                  className="!w-12 !h-12"
                />
                <p className="text-sm font-semibold mt-1">
                  {authorName}
                </p>
                {authorRole && (
                  <p className="text-xs text-gray-400">
                    {authorRole}
                  </p>
                )}
              </div>
              {dateStr && (
                <p className="text-xs text-gray-300">
                  Published {dateStr}
                </p>
              )}
            </div>

            {categories?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <Chip
                    key={cat._id}
                    className="rounded-full px-3 py-1 text-sm font-semibold bg-accent text-darkPrimary"
                  >
                    {cat.title}
                  </Chip>
                ))}
              </div>
            )}

            {excerpt && (
              <p className="text-sm text-gray-200 italic max-w-prose">
                {excerpt}
              </p>
            )}
          </div>

          {/* RIGHT side: col-span-8 */}
          <div className="md:col-span-8 relative w-full h-64 md:h-full">
            <Image
              src={mainImage?.asset?.url || '/placeholder.jpg'}
              alt={mainImage?.alt || title || 'Blog Image'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 67vw,
                     67vw"
            />
          </div>
        </div>

        {/* Optional scroll-down */}
        <ScrollDownButton targetId={nextSectionId} />
      </section>

      {/* Light section for the post content */}
      <section
        id={nextSectionId}
        className="bg-lightPrimary text-darkPrimary py-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg bg-white">
            <CardBody className="p-6 prose prose-lg max-w-none">
              {body ? (
                <PortableText
                  value={body}
                  components={portableTextComponents}
                />
              ) : (
                <p>No content found for this post.</p>
              )}
            </CardBody>

            <CardFooter className="flex justify-end p-4 border-t border-gray-200">
              {/* OnClick instead of Link */}
              <Button
                type="button"
                className="bg-primary text-white hover:bg-accent transition-colors px-4 py-2 flex items-center gap-2"
                onClick={handleBackClick}
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Blog
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <UniversalFooter variant="dark" />
    </>
  );
}
