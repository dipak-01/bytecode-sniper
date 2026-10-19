import networkConfig from '../config/network.json';

interface TransactionDisplayProps {
  transactionHash: string | null;
  providerId: string | null;
  cost: string;
  timestamp: number;
}

export function TransactionDisplay({
  transactionHash,
  providerId,
  cost,
  timestamp
}: TransactionDisplayProps) {
  if (!transactionHash) {
    return (
      <div className="rounded-2xl border border-gray-600/50 bg-gray-800/30 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-gray-400">
          <span className="text-2xl">ℹ️</span>
          <p className="text-sm">
            Local analysis only - Telegraph integration requires wallet connection
          </p>
        </div>
      </div>
    );
  }

  const explorerUrl = `${networkConfig.network.explorerUrl}/tx/${transactionHash}`;
  const date = new Date(timestamp);

  return (
    <div className="rounded-2xl border border-purple-500/50 bg-purple-500/10 p-8 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
        <span>📊</span>
        Transaction Transparency
      </h3>

      <div className="space-y-4">
        {/* Transaction Hash */}
        <div>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Transaction Hash</p>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-purple-400 hover:text-purple-300 break-all flex items-center gap-2 group"
          >
            <span>{transactionHash}</span>
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Provider ID */}
        {providerId && (
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Provider ID</p>
            <p className="font-mono text-sm text-gray-300">{providerId}</p>
          </div>
        )}

        {/* Cost */}
        <div>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Intelligence Cost</p>
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold text-white">
              {cost} <span className="text-sm text-gray-400">{networkConfig.economic.currency}</span>
            </p>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Placeholder</span>
          </div>
        </div>

        {/* Timestamp */}
        <div>
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Timestamp</p>
          <p className="text-sm text-gray-300">{date.toLocaleString()}</p>
        </div>

        {/* Explorer Link Button */}
        <div className="pt-4">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/50"
          >
            View on Sepolia Explorer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
