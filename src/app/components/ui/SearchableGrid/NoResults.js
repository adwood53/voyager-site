// components/ui/SearchableGrid/NoResults.js
import { Button } from '@heroui/react';

export function NoResults({
  onClearFilters,
  title = 'No items found',
  description = 'Try adjusting your search criteria or clear all filters',
}) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">
        {title}
      </h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <Button
        onPress={onClearFilters}
        className="bg-gradient-to-r from-[#e79023] to-[#a6620c] text-white"
      >
        Clear All Filters
      </Button>
    </div>
  );
}
