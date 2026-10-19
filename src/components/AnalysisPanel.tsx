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
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-6"></div>
        <p className="text-gray-300 text-lg animate-pulse">
          Purchasing intelligence through Telegraph Protocol...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-8 backdrop-blur-sm">
        <h3 className="text-xl font-semibold text-red-400 mb-3">
          Analysis Failed
        </h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-60">
        <div className="text-7xl mb-6">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-300">
          Ready to Analyze
        </h3>
        <p className="text-gray-500 max-w-md text-center mt-3 leading-relaxed">
          Enter a contract address above to run autonomous bytecode analysis through the
          Telegraph Protocol
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8 backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
          <span>🔍</span>
          Analysis Findings
        </h3>

        {result.findings.length > 0 ? (
          <ul className="space-y-3 mb-6">
            {result.findings.map((finding: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="text-purple-400 mt-1 font-bold">•</span>
                <span className="text-gray-300 leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 mb-6">
            No findings to display
          </p>
        )}

        <div className="mt-6 pt-6 border-t border-purple-500/20">
          <p className="text-xs text-purple-400 font-bold mb-2 tracking-wider">REASONING</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {result.reasoning}
          </p>
        </div>
      </div>
    </div>
  );
}
