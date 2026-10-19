import { VerdictCard } from './VerdictCard';
import { TransactionDisplay } from './TransactionDisplay';
import { MechanismDisclosure } from './MechanismDisclosure';
import { ProviderRankings } from './ProviderRankings';
import type { AnalysisResult } from '../agents/BytecodeAnalyzer';
import type { Provider } from '../services/TelegraphService';

interface AnalysisPanelProps {
  result: AnalysisResult | null;
  providers: Provider[];
  loading: boolean;
  error: string | null;
}

export function AnalysisPanel({ result, providers, loading, error }: AnalysisPanelProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">
          Purchasing intelligence through Telegraph Protocol...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
          Analysis Failed
        </h3>
        <p className="text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-60">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Ready to Analyze
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-center mt-2">
          Enter a contract address above to run autonomous bytecode analysis through the
          Telegraph Protocol
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mechanism Disclosure */}
      <MechanismDisclosure />

      {/* Verdict Card */}
      <VerdictCard
        verdict={result.verdict}
        confidence={result.confidence}
        contractAddress={result.contractAddress}
      />

      {/* Transaction Display */}
      <TransactionDisplay
        transactionHash={result.transactionHash}
        providerId={result.providerId}
        cost={providers[0]?.cost || '0.10'}
        timestamp={result.timestamp}
      />

      {/* Provider Rankings */}
      <ProviderRankings
        providers={providers}
        selectedProviderId={result.providerId || providers[0]?.id}
      />

      {/* Findings & Reasoning */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-lg font-semibold mb-4">🔍 Analysis Findings</h3>

        {result.findings.length > 0 ? (
          <ul className="space-y-2 mb-4">
            {result.findings.map((finding: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="text-gray-700 dark:text-gray-300">{finding}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No findings to display
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">REASONING</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {result.reasoning}
          </p>
        </div>
      </div>
    </div>
  );
}
