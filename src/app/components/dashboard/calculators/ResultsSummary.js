// src/app/components/dashboard/calculators/ResultsSummary.js
'use client';

export default function ResultsSummary({ results, partner, schema }) {
  if (!results) return null;

  const { features, commissionItems, pricing } = results;
  const showPrice = partner.config?.features?.showPrice !== false;

  return (
    <div className="space-y-6">
      {/* Features */}
      {features.length > 0 && (
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">
              Selected Features
            </h3>
          </div>
          <div className="p-4">
            <dl className="grid grid-cols-1 gap-3">
              {features.map(([key, value], index) => (
                <div key={index} className="flex">
                  <dt className="font-medium text-gray-700 min-w-[160px] mr-2">
                    {key}:
                  </dt>
                  <dd className="text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* Commission Items */}
      {commissionItems.length > 0 && (
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">
              Commission Items
            </h3>
          </div>
          <div className="p-4">
            <ul className="list-disc list-inside space-y-1">
              {commissionItems.map((item, index) => (
                <li key={index} className="text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Pricing (if enabled) */}
      {showPrice && pricing && (
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Pricing</h3>
          </div>
          <div className="p-4">
            <dl className="grid grid-cols-1 gap-3">
              <div className="flex">
                <dt className="font-medium text-gray-700 min-w-[160px] mr-2">
                  Base Price:
                </dt>
                <dd className="text-gray-800">
                  £{pricing.basePrice.toFixed(2)}
                </dd>
              </div>

              {pricing.additionalPrice > 0 && (
                <div className="flex">
                  <dt className="font-medium text-gray-700 min-w-[160px] mr-2">
                    Additional Price:
                  </dt>
                  <dd className="text-gray-800">
                    £{pricing.additionalPrice.toFixed(2)}
                  </dd>
                </div>
              )}

              <div className="flex font-bold">
                <dt className="font-medium text-gray-700 min-w-[160px] mr-2">
                  Total Price:
                </dt>
                <dd className="text-gray-800">
                  £{pricing.totalPrice.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Recommendations (if applicable) */}
      {results.recommendations &&
        results.recommendations.length > 0 && (
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">
                Recommendations
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {results.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-100 rounded-md bg-white"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-800">
                      {rec.name}
                    </h4>
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {rec.match}% Match
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {rec.description}
                  </p>
                  {rec.tier && (
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="font-medium">
                        Recommended Tier:
                      </span>{' '}
                      Tier {rec.tier}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
