// components/ui/SearchableGrid/FeaturedCards.js
export function FeaturedCards({
  title = 'Featured Items',
  items,
  onItemClick,
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#e79023]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="card-voyager hover-3d cursor-pointer transition-all duration-300"
            onClick={() => onItemClick?.(item)}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 ${item.iconBg || 'bg-gradient-to-br from-[#e79023] to-[#a6620c]'} rounded-lg flex items-center justify-center`}
                >
                  {item.icon || (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
