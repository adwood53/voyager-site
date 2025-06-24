// components/ui/SearchableGrid/GridCard.js
export function GridCard({ item, onClick }) {
  return (
    <div
      className="card-voyager hover-3d cursor-pointer transition-all duration-300 group"
      onClick={onClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={`px-2 py-1 rounded text-xs font-medium ${item.badgeClass || 'bg-[#e79023] text-white'}`}
          >
            {item.badge || item.category}
          </div>
          <div className="flex items-center gap-2">
            {item.status && (
              <div
                className={`w-2 h-2 rounded-full ${item.statusColor || 'bg-green-500'}`}
                title={item.status}
              ></div>
            )}
            <span className="text-xs text-gray-500">#{item.id}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2 mb-4">
          <h3 className="font-bold text-white group-hover:text-[#e79023] transition-colors">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-xs text-gray-400 font-medium">
              {item.subtitle}
            </p>
          )}
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
          {item.tags?.slice(0, 2).map((tag, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
            >
              {tag}
            </div>
          ))}
          <div className="ml-auto">
            <svg
              className="w-4 h-4 text-[#e79023] group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
