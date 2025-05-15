'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@heroui/react';
import BlogCard from './BlogCard';
import FlexGrid from '../FlexGrid';
import { useSearchParams, useRouter } from 'next/navigation';
import { sanityClient } from '@/src/lib/sanity';

/**
 * BlogList component fetches posts on mount (client-side), maintains original
 * category filtering, pagination, and URL-sync behavior.
 */
export default function BlogList({ posts: initialPosts = [] }) {
  // 1. allPosts holds the full list of posts (initial from props + fetched)
  const [allPosts, setAllPosts] = useState(initialPosts);
  // 2. categoryId for current filter (default "all")
  const [categoryId, setCategoryId] = useState('all');
  // 3. visiblePosts is the filtered list based on category
  const [visiblePosts, setVisiblePosts] = useState([]);
  // 4. visibleCount controls pagination ("Load More" button)
  const [visibleCount, setVisibleCount] = useState(6);

  // Next.js navigation hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // Compute unique categories from allPosts (memoized)
  const allCategories = useMemo(
    () => getAllCategories(allPosts),
    [allPosts]
  );

  // Memoized filter function to avoid recreating on every render
  const filterPosts = useCallback(
    (id) => filterPostsByCategory(allPosts, id),
    [allPosts]
  );

  // Fetch fresh posts on client mount
  useEffect(() => {
    const query = `*[_type=="post"] | order(publishedAt desc)[0...200]{
      _id,
      title,
      slug{ current },
      excerpt,
      publishedAt,
      mainImage{ asset->{ url } },
      "categories": categories[]->{ _id, title },
      "author": author->{ _id, name, profileImage{ asset->{ url } } }
    }`;

    sanityClient
      .fetch(query)
      .then((data) => {
        // Normalize shape: flatten slug and image URLs
        const normalized = data.map((post) => ({
          ...post,
          slug: post.slug.current,
          mainImage: post.mainImage?.asset?.url || null,
          author: post.author
            ? {
                ...post.author,
                profileImage:
                  post.author.profileImage?.asset?.url || null,
              }
            : null,
        }));
        setAllPosts(normalized);
      })
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  // Initialize category from URL query
  useEffect(() => {
    const catParam = searchParams.get('category');
    let initialId = 'all';
    if (catParam) {
      const match = allCategories.find(
        (c) => c.title.toLowerCase() === catParam.toLowerCase()
      );
      if (match) initialId = match._id;
    }
    setCategoryId(initialId);
  }, [searchParams, allCategories]);

  // Re-filter and reset pagination on category change or when posts update
  useEffect(() => {
    const filtered = filterPosts(categoryId);
    setVisiblePosts(filtered);
    setVisibleCount(6);
  }, [categoryId, filterPosts]);

  // Handle clicking a category button
  function handleCategoryChange(newCategoryId) {
    if (newCategoryId === categoryId) return;
    setCategoryId(newCategoryId);

    // Sync URL
    if (newCategoryId === 'all') {
      router.push('/blog');
    } else {
      const title = allCategories.find(
        (c) => c._id === newCategoryId
      )?.title;
      if (title) {
        router.push(`/blog?category=${encodeURIComponent(title)}`);
      }
    }
  }

  // "Load More" pagination
  function loadMore() {
    setVisibleCount((prev) => prev + 6);
  }

  // Slice the filtered posts for display
  const displayedPosts = visiblePosts.slice(0, visibleCount);

  return (
    <div className="container-voyager py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="heading-voyager text-4xl md:text-5xl text-textLight mb-6">
          Our <span className="text-primary">Blog</span>
        </h1>
        <p className="text-xl text-textLight opacity-80 max-w-3xl mx-auto">
          Insights, updates, and stories from the world of immersive
          technology
        </p>
      </div>

      {/* Category Filter */}
      {allCategories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allCategories.map((category) => (
            <Button
              key={category._id}
              className={
                `px-4 py-2 rounded-full text-sm font-medium transition-all ` +
                (categoryId === category._id
                  ? 'bg-primary text-textLight'
                  : 'bg-darkCard text-textLight hover:bg-primary hover:bg-opacity-20')
              }
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.title}
            </Button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <div className="mb-8">
        {displayedPosts.length > 0 ? (
          <>
            <FlexGrid
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="8"
              animate={false}
              equalHeight
            >
              {displayedPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </FlexGrid>
            {visibleCount < visiblePosts.length && (
              <div className="mt-12 text-center">
                <Button
                  onClick={loadMore}
                  className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105"
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
                onClick={() => handleCategoryChange('all')}
                className="mt-4 bg-primary text-textLight px-4 py-2 rounded-md"
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

// Helper: get unique categories
function getAllCategories(posts) {
  const result = [{ _id: 'all', title: 'All' }];
  if (!Array.isArray(posts) || posts.length === 0) return result;
  const map = new Map();
  posts.forEach((p) => {
    p.categories?.forEach((c) => {
      if (c?._id && !map.has(c._id)) {
        map.set(c._id, c);
        result.push(c);
      }
    });
  });
  return result;
}

// Helper: filter posts by category
function filterPostsByCategory(posts, categoryId) {
  if (!Array.isArray(posts)) return [];
  if (categoryId === 'all') return [...posts];
  return posts.filter((p) =>
    p.categories?.some((c) => c._id === categoryId)
  );
}
