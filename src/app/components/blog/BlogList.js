'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import BlogCard from './BlogCard';
import FlexGrid from '../FlexGrid';
import { useSearchParams, useRouter } from 'next/navigation';

export default function BlogList({ posts = [] }) {
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPostsArray, setFilteredPostsArray] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract unique categories from posts
  const getUniqueCategories = useCallback(() => {
    const categories = new Set();
    posts.forEach((post) => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((category) => {
          if (category && category._id) {
            categories.add(JSON.stringify(category));
          }
        });
      }
    });
    return [
      { _id: 'all', title: 'All' },
      ...Array.from(categories).map((c) => JSON.parse(c)),
    ];
  }, [posts]);

  // Filter posts by category
  const filterPosts = useCallback(
    (categoryId) => {
      console.log(`Filtering by category: ${categoryId}`);

      if (categoryId === 'all') {
        console.log(`Showing all ${posts.length} posts`);
        return [...posts]; // Return a copy of all posts
      }

      const filtered = posts.filter((post) =>
        post.categories?.some(
          (category) => category._id === categoryId
        )
      );

      console.log(
        `Found ${filtered.length} posts for category ${categoryId}`
      );
      return filtered;
    },
    [posts]
  );

  // Check URL for category parameter on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const uniqueCategories = getUniqueCategories();
      const matchingCategory = uniqueCategories.find(
        (cat) =>
          cat.title?.toLowerCase() === categoryParam.toLowerCase()
      );

      if (matchingCategory) {
        setActiveCategory(matchingCategory._id);
      }
    }
  }, [searchParams, getUniqueCategories]);

  // Update filtered posts whenever activeCategory changes
  useEffect(() => {
    setVisiblePosts(6); // Reset pagination
    const filtered = filterPosts(activeCategory);
    console.log(
      `Setting filtered posts array with ${filtered.length} posts`
    );
    setFilteredPostsArray(filtered);
  }, [activeCategory, filterPosts]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    console.log(`Changing category to: ${categoryId}`);
    setActiveCategory(categoryId);

    // Update URL if needed (optional)
    if (categoryId === 'all') {
      router.push('/blog');
    } else {
      const categoryTitle = getUniqueCategories().find(
        (cat) => cat._id === categoryId
      )?.title;
      if (categoryTitle) {
        router.push(
          `/blog?category=${encodeURIComponent(categoryTitle)}`
        );
      }
    }
  };

  // Show more posts
  const loadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Debugging info
  console.log(`Total posts: ${posts.length}`);
  console.log(`Active category: ${activeCategory}`);
  console.log(`Filtered posts: ${filteredPostsArray.length}`);
  console.log(
    `Visible posts: ${Math.min(visiblePosts, filteredPostsArray.length)}`
  );

  const uniqueCategories = getUniqueCategories();

  return (
    <div className="container-voyager py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="heading-voyager text-4xl md:text-5xl text-textLight mb-6 text-center">
          Our <span className="text-primary">Blog</span>
        </h1>
        <p className="text-xl text-textLight opacity-80 max-w-3xl mx-auto text-center">
          Insights, updates, and stories from the world of immersive
          technology
        </p>
      </motion.div>

      {/* Category Filter */}
      {uniqueCategories.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {uniqueCategories.map((category) => (
            <Button
              key={category._id || `category-${Math.random()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category._id
                  ? 'bg-primary text-textLight'
                  : 'bg-darkCard text-textLight hover:bg-primary hover:bg-opacity-20'
              }`}
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.title}
            </Button>
          ))}
        </motion.div>
      )}

      {/* Posts Grid with Key Based on ActiveCategory for Complete Re-render */}
      <div key={`category-${activeCategory}-posts`}>
        {filteredPostsArray.length > 0 ? (
          <>
            <FlexGrid
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="8"
              animate={true}
              container={container}
              item={item}
              equalHeight={true}
            >
              {filteredPostsArray
                .slice(0, visiblePosts)
                .map((post) => (
                  <BlogCard
                    key={post._id || `post-${Math.random()}`}
                    post={post}
                  />
                ))}
            </FlexGrid>

            {/* Load More Button */}
            {visiblePosts < filteredPostsArray.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 text-center"
              >
                <Button
                  onClick={loadMore}
                  className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105 transform hover:shadow-glow"
                >
                  Load More
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-textLight opacity-80 text-lg">
              No posts found in this category.
            </p>
            {activeCategory !== 'all' && (
              <Button
                className="mt-4 bg-primary text-textLight font-medium hover:bg-accent px-4 py-2 rounded-md transition-all"
                onClick={() => handleCategoryChange('all')}
              >
                View All Posts
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
