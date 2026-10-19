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
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span>ℹ️</span>
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
    <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
      <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
        📊 Transaction Transparency
      </h3>

      <div className="space-y-3">
        {/* Transaction Hash */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Transaction Hash</p>
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
          >
            {transactionHash}
          </a>
        </div>

        {/* Provider ID */}
        {providerId && (
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Provider ID</p>
            <p className="font-mono text-sm">{providerId}</p>
          </div>
        )}

        {/* Cost */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Intelligence Cost</p>
          <p className="text-sm">
            <span className="font-semibold">{cost}</span> {networkConfig.economic.currency}
            <span className="ml-2 text-xs opacity-70">(Placeholder)</span>
          </p>
        </div>

        {/* Timestamp */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timestamp</p>
          <p className="text-sm">{date.toLocaleString()}</p>
        </div>

        {/* Explorer Link Button */}
        <div className="pt-2">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
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
