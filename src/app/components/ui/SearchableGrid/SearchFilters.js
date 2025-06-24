// components/ui/SearchableGrid/SearchFilters.js - Fixed Icon Positioning
import { Input, Select, SelectItem, Button } from '@heroui/react';

export function SearchFilters({
  searchTerm,
  onSearchChange,
  filters,
  filterConfigs,
  onFilterChange,
  onClearFilters,
  searchPlaceholder = 'Type to search...',
}) {
  return (
    <div className="card-voyager p-6">
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        style={{
          gridTemplateColumns: `1fr repeat(${filterConfigs.length}, 1fr) auto`,
        }}
      >
        {/* Search Input - Fixed Icon Positioning */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search
          </label>
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            classNames={{
              base: 'max-w-full',
              mainWrapper: 'h-full',
              input: [
                'bg-transparent',
                'text-white',
                'placeholder:text-gray-400',
              ],
              inputWrapper: [
                'bg-[#1e1e1e]',
                'border-[#e79023]/20',
                'hover:border-[#e79023]/40',
                'focus-within:!border-[#e79023]',
                '!cursor-text',
                'group-data-[focus=true]:bg-[#1e1e1e]',
              ],
              // Fix inner wrapper positioning
              innerWrapper: 'bg-transparent',
            }}
            startContent={
              <svg
                className="w-4 h-4 text-gray-400 pointer-events-none flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Dynamic Filters - Fixed Dropdown Icon Positioning */}
        {filterConfigs.map((config) => (
          <div key={config.key}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {config.label}
            </label>
            <Select
              placeholder={
                config.placeholder || `All ${config.label}`
              }
              selectedKeys={
                filters[config.key] === 'all'
                  ? []
                  : [filters[config.key]]
              }
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0];
                onFilterChange(config.key, value || 'all');
              }}
              classNames={{
                base: 'max-w-full',
                trigger: [
                  'bg-[#1e1e1e]',
                  'border-[#e79023]/20',
                  'hover:border-[#e79023]/40',
                  'focus:border-[#e79023]',
                  'data-[hover=true]:bg-[#1e1e1e]',
                  'data-[selectable=true]:focus:bg-[#1e1e1e]',
                  'data-[pressed=true]:bg-[#1e1e1e]',
                  'data-[focus-visible=true]:bg-[#1e1e1e]',
                  // Ensure proper layout structure
                  'min-h-[40px]',
                ],
                // Critical: Control the inner wrapper layout
                innerWrapper: [
                  'bg-transparent',
                  'group-data-[has-value=true]:items-center',
                ],
                value: [
                  'text-white',
                  'group-data-[has-value=true]:text-white',
                  'text-left',
                  'flex-1',
                ],
                // Fix selector icon positioning specifically
                selectorIcon: [
                  'text-gray-400',
                  'right-3',
                  'text-medium',
                  'absolute',
                  'top-1/2',
                  'transform',
                  '-translate-y-1/2',
                  'transition-transform',
                  'group-data-[open=true]:rotate-180',
                ],
                popoverContent: [
                  'bg-[#1e1e1e]',
                  'border-[#e79023]/20',
                ],
                listbox: 'bg-[#1e1e1e]',
              }}
              // Use custom selector icon with proper sizing
              selectorIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              }
              // Disable default rotation since we're handling it in CSS
              disableSelectorIconRotation={false}
            >
              <SelectItem
                key="all"
                classNames={{
                  base: [
                    'text-white',
                    'data-[hover=true]:bg-[#e79023]/20',
                    'data-[selectable=true]:focus:bg-[#e79023]/20',
                    'data-[pressed=true]:bg-[#e79023]/30',
                    'data-[focus-visible=true]:bg-[#e79023]/20',
                  ],
                }}
              >
                {config.placeholder || `All ${config.label}`}
              </SelectItem>
              {config.options.map((option) => (
                <SelectItem
                  key={option.value}
                  classNames={{
                    base: [
                      'text-white',
                      'data-[hover=true]:bg-[#e79023]/20',
                      'data-[selectable=true]:focus:bg-[#e79023]/20',
                      'data-[pressed=true]:bg-[#e79023]/30',
                      'data-[focus-visible=true]:bg-[#e79023]/20',
                    ],
                  }}
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        ))}

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <Button
            onPress={onClearFilters}
            className="w-full bg-gradient-to-r from-[#e79023] to-[#a6620c] text-white hover:scale-105 transition-transform shadow-lg hover:shadow-[#e79023]/25"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
