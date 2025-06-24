// components/ui/SearchableGrid/SearchFilters.js
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
        {/* Search Input */}
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
              ],
            }}
            startContent={
              <svg
                className="w-4 h-4 text-gray-400 pointer-events-none flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

        {/* Dynamic Filters */}
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
                ],
                value:
                  'text-white group-data-[has-value=true]:text-white',
                selectorIcon: 'text-gray-400',
                popoverContent: [
                  'bg-[#1e1e1e]',
                  'border-[#e79023]/20',
                ],
                listbox: 'bg-[#1e1e1e]',
              }}
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
