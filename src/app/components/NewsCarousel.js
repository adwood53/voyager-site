'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

/**
 * NewsCarousel Component
 * Displays a carousel of recent blog posts with "Test Blog" category
 * with improved readability and colors matching the design image
 */
export default function NewsCarousel() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const carouselRef = useRef(null);

  // Fetch blog posts for carousel
  useEffect(() => {
    const query = groq`
      *[_type == "post" && "News" in categories[]->title] | order(publishedAt desc)[0...5]{
        title,
        excerpt,
        "slug": slug.current,
        mainImage {
          asset->{
            url
          }
        },
        publishedAt,
        categories[]->{
          _id,
          title
        }
      }
    `;

    sanityClient
      .fetch(query)
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
        // Provide fallback data in case of error
        setBlogPosts([]);
      });
  }, []);

  // Carousel navigation functions
  const nextSlide = () => {
    if (!blogPosts.length) return;
    setCurrentSlide((prev) =>
      prev === blogPosts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!blogPosts.length) return;
    setCurrentSlide((prev) =>
      prev === 0 ? blogPosts.length - 1 : prev - 1
    );
  };

  // Function to navigate to blog post
  function handleReadMore(slug) {
    router.push(`/blog/${slug}`);
  }

  // Function to view all blog posts
  function handleViewAllPosts() {
    router.push('/blog');
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="relative w-full">
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-center">
            <p className="text-darkPrimary">Loading latest news...</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && blogPosts.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <p className="text-darkPrimary mb-4">
              No news articles available yet.
            </p>
            <Button
              className="bg-primary text-textLight hover:bg-accent transition-colors"
              onClick={handleViewAllPosts}
            >
              Visit Our Blog
            </Button>
          </div>
        </div>
      )}

      {/* Carousel content */}
      {!loading && blogPosts.length > 0 && (
        <div className="relative" ref={carouselRef}>
          {/* Current slide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature post (takes 2 columns) */}
            <Card className="md:col-span-2 bg-black text-textLight shadow-lg hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image side */}
                <div className="relative h-64 md:h-auto">
                  {blogPosts[currentSlide]?.mainImage?.asset?.url ? (
                    <Image
                      src={
                        blogPosts[currentSlide].mainImage.asset.url
                      }
                      alt={blogPosts[currentSlide].title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black">
                      <p className="text-textLight">
                        No image available
                      </p>
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className="flex flex-col p-6">
                  <h3 className="text-xl font-semibold mb-2 text-textLight">
                    {blogPosts[currentSlide].title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2">
                    {formatDate(blogPosts[currentSlide].publishedAt)}
                  </p>
                  <div className="mb-4">
                    {blogPosts[currentSlide].categories?.map(
                      (cat) => (
                        <span
                          key={cat._id}
                          className="inline-block bg-primary text-white text-xs px-2 py-1 rounded mr-2 mb-2"
                        >
                          {cat.title}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-sm mb-4 flex-grow text-textLight">
                    {blogPosts[currentSlide].excerpt ||
                      'Read more about this article on our blog...'}
                  </p>
                  <Button
                    type="button"
                    onClick={() =>
                      handleReadMore(blogPosts[currentSlide].slug)
                    }
                    className="mt-auto bg-primary text-textLight hover:bg-accent
                             transition-colors px-4 py-2 flex items-center gap-2 w-fit"
                  >
                    Read More
                    <ArrowRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Next post preview (1 column) */}
            <Card className="bg-white border border-gray-200 text-darkPrimary shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-semibold text-darkPrimary">
                  Coming Up Next
                </h3>
              </CardHeader>
              <CardBody className="p-4 flex flex-col h-full">
                {blogPosts.length > 1 ? (
                  <>
                    <div className="relative h-36 mb-4">
                      {blogPosts[
                        (currentSlide + 1) % blogPosts.length
                      ]?.mainImage?.asset?.url ? (
                        <Image
                          src={
                            blogPosts[
                              (currentSlide + 1) % blogPosts.length
                            ].mainImage.asset.url
                          }
                          alt={
                            blogPosts[
                              (currentSlide + 1) % blogPosts.length
                            ].title
                          }
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <p className="text-darkPrimary">
                            No image available
                          </p>
                        </div>
                      )}
                    </div>
                    <h4 className="text-lg font-medium mb-2 text-darkPrimary">
                      {
                        blogPosts[
                          (currentSlide + 1) % blogPosts.length
                        ].title
                      }
                    </h4>
                    <p className="text-sm text-gray-600 mb-auto">
                      {formatDate(
                        blogPosts[
                          (currentSlide + 1) % blogPosts.length
                        ].publishedAt
                      )}
                    </p>
                  </>
                ) : (
                  <p className="italic text-gray-600 flex-grow flex items-center justify-center">
                    No additional posts available
                  </p>
                )}
              </CardBody>
              <CardFooter className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between w-full">
                  <Button
                    type="button"
                    onClick={prevSlide}
                    className="bg-gray-100 hover:bg-gray-200 text-darkPrimary
                               transition-colors p-2 rounded-full"
                  >
                    <Image
                      src="/icons/LeftArrow.svg"
                      alt="Previous"
                      width={24}
                      height={24}
                    />
                  </Button>
                  <Button
                    type="button"
                    onClick={nextSlide}
                    className="bg-gray-100 hover:bg-gray-200 text-darkPrimary
                               transition-colors p-2 rounded-full"
                  >
                    <Image
                      src="/icons/RightArrow.svg"
                      alt="Next"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* View all blogs button */}
          <div className="flex justify-center mt-8">
            <Button
              type="button"
              onClick={handleViewAllPosts}
              className="bg-primary text-textLight hover:bg-accent
                       transition-colors px-6 py-3 flex items-center gap-2"
            >
              View All News
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
