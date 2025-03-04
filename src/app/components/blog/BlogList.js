'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@heroui/react';
import BlogCard from './BlogCard';
import FlexGrid from '../FlexGrid';
import { useSearchParams, useRouter } from 'next/navigation';

export default function BlogList({ posts = [] }) {
  // Store both the selected category ID and filtered posts in state
  const [categoryId, setCategoryId] = useState('all');
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get all unique categories from posts - memoized to prevent recalculation on every render
  const allCategories = useMemo(
    () => getAllCategories(posts),
    [posts]
  );

  // Create a memoized filter function to prevent unnecessary re-renders
  const filterPosts = useCallback(
    (categoryId) => {
      return filterPostsByCategory(posts, categoryId);
    },
    [posts]
  );

  // Initialize from URL and set up category/filtering - runs only once on mount
  useEffect(() => {
    // Check URL for category
    const categoryParam = searchParams.get('category');
    let initialCategoryId = 'all';

    if (categoryParam) {
      const matchingCategory = allCategories.find(
        (cat) =>
          cat.title?.toLowerCase() === categoryParam.toLowerCase()
      );

      if (matchingCategory) {
        initialCategoryId = matchingCategory._id;
      }
    }

    // Set the initial category
    setCategoryId(initialCategoryId);

    // Initial filtering is now handled by the second useEffect
  }, [searchParams, allCategories]);

  // Re-filter when posts or category changes
  useEffect(() => {
    // Filter posts based on selected category
    const filtered = filterPosts(categoryId);

    // Update visible posts
    setVisiblePosts(filtered);

    // Reset pagination when category changes
    setVisibleCount(6);
  }, [categoryId, filterPosts]);

  // Handle category selection
  function handleCategoryChange(newCategoryId) {
    if (newCategoryId === categoryId) return;

    // Update category
    setCategoryId(newCategoryId);

    // Update URL
    if (newCategoryId === 'all') {
      router.push('/blog');
    } else {
      const categoryTitle = allCategories.find(
        (cat) => cat._id === newCategoryId
      )?.title;

      if (categoryTitle) {
        router.push(
          `/blog?category=${encodeURIComponent(categoryTitle)}`
        );
      }
    }
  }

  // Show more posts button handler
  function loadMore() {
    setVisibleCount((prev) => prev + 6);
  }

  // Posts to display based on pagination
  const displayedPosts = visiblePosts.slice(0, visibleCount);

  return (
    <div className="container-voyager py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="heading-voyager text-4xl md:text-5xl text-textLight mb-6 text-center">
          Our <span className="text-primary">Blog</span>
        </h1>
        <p className="text-xl text-textLight opacity-80 max-w-3xl mx-auto text-center">
          Insights, updates, and stories from the world of immersive
          technology
        </p>
      </div>

      {/* Category Filter */}
      {allCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allCategories.map((category) => (
            <Button
              key={`category-${category._id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                categoryId === category._id
                  ? 'bg-primary text-textLight'
                  : 'bg-darkCard text-textLight hover:bg-primary hover:bg-opacity-20'
              }`}
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.title}
            </Button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <div>
        {displayedPosts.length > 0 ? (
          <>
            <FlexGrid
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="8"
              animate={false}
              equalHeight={true}
            >
              {displayedPosts.map((post) => (
                <BlogCard key={`post-${post._id}`} post={post} />
              ))}
            </FlexGrid>

            {/* Load More Button */}
            {visibleCount < visiblePosts.length && (
              <div className="mt-12 text-center">
                <Button
                  onClick={loadMore}
                  className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105 transform hover:shadow-glow"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-textLight opacity-80 text-lg">
              No posts found in this category.
            </p>
            {categoryId !== 'all' && (
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

// Helper function to get all unique categories from posts
function getAllCategories(posts) {
  // Start with "All" category
  const result = [{ _id: 'all', title: 'All' }];

  // Ensure posts is an array
  if (!Array.isArray(posts) || posts.length === 0) {
    return result;
  }

  // Extract unique categories
  const categoryMap = new Map();

  posts.forEach((post) => {
    if (post?.categories && Array.isArray(post.categories)) {
      post.categories.forEach((category) => {
        if (
          category &&
          category._id &&
          !categoryMap.has(category._id)
        ) {
          categoryMap.set(category._id, category);
          result.push(category);
        }
      });
    }
  });

  return result;
}

// Helper function to filter posts by category
function filterPostsByCategory(posts, categoryId) {
  // Ensure posts is an array
  if (!Array.isArray(posts) || posts.length === 0) {
    return [];
  }

  // Return all posts for 'all' category
  if (categoryId === 'all') {
    return [...posts];
  }

  // Filter posts by category
  return posts.filter((post) =>
    post?.categories?.some((category) => category._id === categoryId)
  );
}
