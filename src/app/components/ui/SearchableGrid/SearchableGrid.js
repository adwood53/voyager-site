// components/ui/SearchableGrid/SearchableGrid.js
'use client';

import { useState, useMemo } from 'react';
import { SearchFilters } from './SearchFilters';
import { FeaturedCards } from './FeaturedCards';
import { GridCard } from './GridCard';
import { NoResults } from './NoResults';

/**
 * Modular Searchable Grid Component
 *
 * @param {Object} props
 * @param {string} props.title - Main title
 * @param {string} props.subtitle - Subtitle description
 * @param {Array} props.items - Array of items to display
 * @param {Array} props.featuredItems - Array of featured items (optional)
 * @param {Array} props.filterConfigs - Filter configuration array
 * @param {Function} props.onItemClick - Callback when item is clicked
 * @param {Function} props.onFeaturedClick - Callback when featured item is clicked
 * @param {Function} props.renderCard - Custom card renderer (optional)
 * @param {Object} props.gridProps - Grid layout props
 * @param {string} props.searchPlaceholder - Search input placeholder
 * @param {boolean} props.showCounter - Show item counter
 */
export function SearchableGrid({
  title,
  subtitle,
  items = [],
  featuredItems = [],
  filterConfigs = [],
  onItemClick,
  onFeaturedClick,
  renderCard,
  gridProps = {},
  searchPlaceholder = 'Type to search...',
  showCounter = true,
  children,
}) {
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(
    filterConfigs.reduce(
      (acc, config) => ({
        ...acc,
        [config.key]: 'all',
      }),
      {}
    )
  );

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const searchFields = item.searchFields || [
        item.title,
        item.description,
      ];
      const matchesSearch = searchFields.some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Category filters
      const matchesFilters = filterConfigs.every((config) => {
        const filterValue = filters[config.key];
        if (filterValue === 'all') return true;
        return item[config.key] === filterValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, filters, filterConfigs]);

  // Handle filter change
  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters(
      filterConfigs.reduce(
        (acc, config) => ({
          ...acc,
          [config.key]: 'all',
        }),
        {}
      )
    );
  };

  const {
    columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    gap = 'gap-4',
    ...otherGridProps
  } = gridProps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-gray-900 to-[#121212] text-white">
      <div className="max-w-7xl mx-auto space-y-8 p-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#e79023] to-[#a6620c] rounded-full">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#e79023] font-bold text-sm">
                {title?.charAt(0) || 'S'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
          {subtitle && (
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {showCounter && (
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e79023] rounded-full animate-pulse"></div>
                <span className="text-gray-400">
                  {filteredItems.length} of {items.length} items
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Search Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          filterConfigs={filterConfigs}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          searchPlaceholder={searchPlaceholder}
        />

        {/* Featured Items */}
        {featuredItems.length > 0 && (
          <FeaturedCards
            title="Featured Items"
            items={featuredItems}
            onItemClick={onFeaturedClick}
          />
        )}

        {/* Custom content between filters and grid */}
        {children}

        {/* Main Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#e79023]">
              All Items
            </h2>
            <div className="text-sm text-gray-400">
              {filteredItems.length} items found
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div
              className={`grid ${columns} ${gap}`}
              {...otherGridProps}
            >
              {filteredItems.map((item, index) =>
                renderCard ? (
                  renderCard(item, index, onItemClick)
                ) : (
                  <GridCard
                    key={item.id || index}
                    item={item}
                    onClick={() => onItemClick?.(item)}
                  />
                )
              )}
            </div>
          ) : (
            <NoResults onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>
    </div>
  );
}
