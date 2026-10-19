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
    <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
        <span>🏆</span>
        Telegraph Provider Rankings
      </h3>

      <div className="space-y-3">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`p-4 rounded-xl border transition-all ${
              selectedProviderId === provider.id
                ? 'border-purple-500 bg-purple-500/20'
                : 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  provider.rank === 1
                    ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/50'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {provider.rank === 1 ? '👑' : `#${provider.rank}`}
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-300">
                    {provider.address.slice(0, 6)}...{provider.address.slice(-4)}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Score:</span>
                      <span className="text-xs font-semibold text-white">{(provider.score * 100).toFixed(0)}%</span>
                    </div>
                    <span className="text-xs text-gray-600">•</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Cost:</span>
                      <span className="text-xs font-semibold text-purple-400">{provider.cost} USDC</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedProviderId === provider.id && (
                <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                  Selected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-purple-500/20">
        <p className="text-xs text-gray-500 italic text-center">
          Providers ranked by Telegraph Protocol validators based on accuracy, speed, and reliability
        </p>
      </div>
    </div>
  );
}
