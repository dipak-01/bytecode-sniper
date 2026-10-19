import type { Provider } from '../services/TelegraphService';

interface ProviderRankingsProps {
  providers: Provider[];
  selectedProviderId?: string;
}

export function ProviderRankings({ providers, selectedProviderId }: ProviderRankingsProps) {
  if (providers.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <h3 className="text-lg font-semibold mb-4">🏆 Telegraph Provider Rankings</h3>

      <div className="space-y-3">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`p-4 rounded-lg border transition-all ${
              selectedProviderId === provider.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                  provider.rank === 1
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {provider.rank === 1 ? '👑' : `#${provider.rank}`}
                </div>
                <div>
                  <p className="font-mono text-sm">
                    {provider.address.slice(0, 6)}...{provider.address.slice(-4)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Score:</span>
                      <span className="text-xs font-semibold">{(provider.score * 100).toFixed(0)}%</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Cost:</span>
                      <span className="text-xs font-semibold">{provider.cost} USDC</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedProviderId === provider.id && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">
                  Selected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400 italic">
          Providers ranked by Telegraph Protocol validators based on accuracy, speed, and reliability
        </p>
      </div>
    </div>
  );
}
