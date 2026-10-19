import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bytecodeAnalyzer, { type AnalysisResult } from '../agents/BytecodeAnalyzer';
import telegraphService, { type Provider } from '../services/TelegraphService';
import { AnalysisPanel } from '../components/AnalysisPanel';

export function Analyze() {
  const navigate = useNavigate();
  const [contractAddress, setContractAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contractAddress.trim()) {
      setError('Please enter a valid contract address');
      return;
    }

    // Basic address validation
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) {
      setError('Invalid Ethereum address format');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setProviders([]);

    try {
      // Get provider rankings
      const provs = await telegraphService.getProviders('int-001');
      setProviders(provs);

      // Run analysis
      const analysisResult = await bytecodeAnalyzer.analyze({
        contractAddress: contractAddress.toLowerCase(),
        requestId: `req-${Date.now()}`
      });

      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analyze Contract Bytecode
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Autonomous security analysis through Telegraph Protocol
        </p>
      </div>

      {/* Input Form */}
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contractAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contract Address
            </label>
            <input
              id="contractAddress"
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                🔍 Analyze
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-lg mx-auto rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 dark:text-red-300 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            New Analysis
          </button>
          <AnalysisPanel
            result={result}
            providers={providers}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </div>
  );
}
