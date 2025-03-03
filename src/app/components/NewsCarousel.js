'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Link, Card, CardBody } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { sanityClient } from '@/src/lib/sanity';

export default function NewsCarousel({
  title = 'Latest News',
  categoryId = null, // Optional category ID to filter by
  limit = 5, // Number of posts to fetch
  subtitle = 'Stay updated with the latest from our immersive technology world',
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  // Fetch posts from Sanity
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Build query based on whether categoryId is provided
        let query = `*[_type == "post"`;

        // Add category filter if categoryId is provided
        if (categoryId) {
          query += ` && $categoryId in categories[]->_id`;
        }

        // Complete the query
        query += `] | order(publishedAt desc)[0...${limit}]{
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          mainImage{asset->{url}},
          "categories": categories[]->{ _id, title },
          "author": author->{ _id, name, profileImage{asset->{url}} }
        }`;

        // Execute the query
        const postsData = await sanityClient.fetch(
          query,
          categoryId ? { categoryId } : {}
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
        console.error(
          'Error fetching blog posts for carousel:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId, limit]);

  // Reset autoplay countdown when slide changes
  useEffect(() => {
    if (autoplay && posts.length > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000); // 5 seconds per slide
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide, autoplay, posts.length]);

  // Pause autoplay when user interacts with carousel
  const pauseAutoplay = () => {
    setAutoplay(false);
    // Resume after 10 seconds of inactivity
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAutoplay(true);
    }, 10000);
  };

  const nextSlide = () => {
    if (posts.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }
  };

  const prevSlide = () => {
    if (posts.length > 0) {
      setCurrentSlide(
        (prev) => (prev - 1 + posts.length) % posts.length
      );
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    pauseAutoplay();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Only render if we have posts
  if (!posts || posts.length === 0) {
    if (!loading) return null; // Don't render anything if we have no posts and we're done loading

    // Optional loading state
    return (
      <section
        id="news"
        ref={sectionRef}
        className="py-24 bg-darkBg relative overflow-hidden"
      >
        <div className="container-voyager">
          <div className="text-center">
            <h2 className="heading-voyager text-4xl md:text-5xl text-textLight mb-6">
              Loading <span className="text-primary">{title}</span>...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="news"
      ref={sectionRef}
      className="py-24 bg-darkBg relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            {title.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-primary">{word}</span>
                ) : (
                  `${word} `
                )}
              </span>
            ))}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-textLight opacity-80 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative" ref={carouselRef}>
          {/* Carousel container */}
          <div className="overflow-hidden rounded-lg shadow-glow-sm border border-primary border-opacity-20">
            <div
              className="relative transition-transform duration-500 ease-in-out h-[500px] md:h-[600px]"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <div className="flex">
                {posts.map((post, index) => (
                  <div
                    key={post._id || index}
                    className="min-w-full relative"
                    style={{
                      left: `${index * 100}%`,
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-darkCard"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/70 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                      <Card className="card-voyager bg-darkCard bg-opacity-80 backdrop-blur-sm border border-primary border-opacity-30 w-full md:w-2/3 lg:w-1/2 ml-auto mr-auto md:ml-0 md:mr-auto">
                        <CardBody className="p-6">
                          {post.categories &&
                            post.categories.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.categories
                                  .slice(0, 2)
                                  .map((category) => (
                                    <span
                                      key={category._id}
                                      className="px-3 py-1 bg-primary bg-opacity-20 text-primary text-sm rounded-full"
                                    >
                                      {category.title}
                                    </span>
                                  ))}
                              </div>
                            )}

                          <h3 className="text-2xl md:text-3xl font-heading text-primary mb-4">
                            {post.title}
                          </h3>

                          <p className="text-textLight opacity-80 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
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
                                      {post.author.name?.charAt(0) ||
                                        'A'}
                                    </div>
                                  )}
                                  <span className="text-sm text-textLight opacity-70">
                                    {post.author.name}
                                  </span>
                                </div>
                              )}

                              {post.publishedAt && (
                                <div className="text-sm text-textLight opacity-70">
                                  {formatDate(post.publishedAt)}
                                </div>
                              )}
                            </div>

                            <Button
                              as={Link}
                              href={`/blog/${post.slug}`}
                              className="bg-primary text-textLight font-medium hover:bg-accent px-4 py-2 rounded-md transition-all hover:shadow-glow text-sm"
                            >
                              Read More →
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            <Button
              onClick={() => {
                prevSlide();
                pauseAutoplay();
              }}
              className="ml-4 w-12 h-12 rounded-full bg-darkBg bg-opacity-60 backdrop-blur-sm text-textLight hover:bg-primary transition-all pointer-events-auto"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              onClick={() => {
                nextSlide();
                pauseAutoplay();
              }}
              className="mr-4 w-12 h-12 rounded-full bg-darkBg bg-opacity-60 backdrop-blur-sm text-textLight hover:bg-primary transition-all pointer-events-auto"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? 'bg-primary shadow-glow-sm w-8'
                    : 'bg-textLight bg-opacity-30 hover:bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button
            as={Link}
            href="/blog"
            className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105 transform hover:shadow-glow"
          >
            View All Posts →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
