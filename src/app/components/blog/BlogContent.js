'use client';

import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

export default function BlogContent({ post, loading }) {
  // Custom PortableText components for rendering rich content
  const components = {
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-heading text-primary mb-4">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-heading text-primary mb-3 mt-6">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-heading text-primary mb-2 mt-5">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="text-textLight opacity-80 mb-4">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-textLight opacity-70">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-4 text-textLight opacity-80">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4 text-textLight opacity-80">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1">{children}</li>,
      number: ({ children }) => <li className="mb-1">{children}</li>,
    },
    marks: {
      link: ({ children, value }) => {
        const rel = value?.href?.startsWith('/')
          ? undefined
          : 'noreferrer noopener';
        return (
          <a
            href={value?.href}
            className="text-primary hover:text-accent underline transition-colors"
            target={
              value?.href?.startsWith('/') ? undefined : '_blank'
            }
            rel={rel}
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-textLight">
          {children}
        </strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
    },
    types: {
      image: ({ value }) => {
        // Fallback if asset or url is missing
        if (!value?.asset?.url) {
          console.warn('Missing image asset URL:', value);
          return (
            <div className="my-6 p-4 bg-primary bg-opacity-10 rounded-lg text-center">
              <p className="text-textLight opacity-70">
                Image could not be loaded
              </p>
            </div>
          );
        }

        return (
          <div className="my-6 relative overflow-hidden rounded-lg border border-primary border-opacity-20">
            <div className="relative aspect-video">
              <Image
                src={value.asset.url}
                alt={value.alt || 'Blog image'}
                fill
                className="object-cover"
              />
            </div>
            {value.caption && (
              <div className="p-2 text-center text-sm text-textLight opacity-70">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
    },
  };

  // Loading state
  if (loading) {
    return (
      <div className="container-voyager py-8">
        <Card className="card-voyager bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-40 w-full">
          <CardBody className="py-8 px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-primary bg-opacity-20 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-primary bg-opacity-10 rounded mb-2 w-1/4"></div>
              <div className="h-64 bg-primary bg-opacity-10 rounded my-6"></div>
              <div className="space-y-2">
                <div className="h-4 bg-primary bg-opacity-10 rounded w-full"></div>
                <div className="h-4 bg-primary bg-opacity-10 rounded w-full"></div>
                <div className="h-4 bg-primary bg-opacity-10 rounded w-3/4"></div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Error or no post data
  if (!post) {
    return (
      <div className="container-voyager py-8">
        <Card className="card-voyager bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-40 w-full">
          <CardBody className="py-8 px-6">
            <p className="text-textLight opacity-80">
              Post not found or is still loading...
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-voyager py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="card-voyager bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-40 w-full">
          <CardBody className="py-8 px-6">
            {/* Featured Image (if available) */}
            {post.mainImage && (
              <div className="mb-8 relative overflow-hidden rounded-lg border border-primary border-opacity-20">
                <div className="aspect-video relative">
                  <Image
                    src={post.mainImage}
                    alt={post.title || 'Blog post'}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Post Header */}
            <div className="mb-8">
              <h1 className="heading-voyager text-3xl md:text-4xl text-primary mb-4">
                {post.title || 'Untitled Post'}
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories?.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 bg-primary bg-opacity-20 text-white text-sm rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-textLight opacity-70">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {post.author.profileImage ? (
                      <Image
                        src={post.author.profileImage}
                        alt={post.author.name}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-textLight">
                        {post.author.name?.charAt(0) || 'A'}
                      </div>
                    )}
                    <span>{post.author.name}</span>
                  </div>
                )}

                {post.publishedAt && (
                  <div>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(
                        'en-GB',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </time>
                  </div>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-invert max-w-none">
              {post.body ? (
                <PortableText
                  value={post.body}
                  components={components}
                />
              ) : (
                <p className="text-textLight opacity-80">
                  No content available for this post.
                </p>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
