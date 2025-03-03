'use client';

import { Card, CardBody, CardFooter, Link } from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BlogCard({ post }) {
  if (!post) return null;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Truncate text to a certain number of words
  const truncateText = (text, maxWords = 20) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card className="card-voyager h-full overflow-hidden bg-gradient-to-br from-backgroundDark to-darkBg border border-primary border-opacity-20 hover:border-primary hover:border-opacity-50 transition-all group hover:shadow-glow-sm">
        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.mainImage}
              alt={post.title || 'Blog post'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent"></div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category._id}
                    className="bg-primary/90 text-white px-2 py-1 text-xs rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
                {post.categories.length > 2 && (
                  <span className="bg-primary/90 text-white px-2 py-1 text-xs rounded-full">
                    +{post.categories.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        <CardBody>
          {/* Date */}
          {post.publishedAt && (
            <div className="text-sm text-textLight opacity-60 mb-2">
              {formatDate(post.publishedAt)}
            </div>
          )}

          {/* Title */}
          <h3 className="font-subheading text-2xl text-primary mb-3 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-textLight/70 line-clamp-3">
            {post.excerpt || truncateText(post.plainTextBody || '')}
          </p>

          {/* Author (if available) */}
          {post.author && (
            <div className="flex items-center mt-4 gap-2">
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
              <span className="text-sm text-textLight opacity-70">
                {post.author.name}
              </span>
            </div>
          )}
        </CardBody>

        <CardFooter className="pt-0">
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary hover:text-accent font-medium transition-colors"
          >
            Read more →
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
