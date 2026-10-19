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
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
          🕵️ Autonomous Security Analysis
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Analyze Contract Bytecode
        </h1>
        <p className="text-gray-400 text-lg">
          Secure your trade with Telegraph Protocol intelligence
        </p>
      </div>

      {/* Input Form */}
      <div className="mb-12">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <label htmlFor="contractAddress" className="block text-sm font-semibold text-gray-300">
              Contract Address
            </label>
            <input
              id="contractAddress"
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-4 bg-gray-800/50 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white font-mono text-lg transition-all"
              style={{ colorScheme: 'dark' }}
            />
            <p className="text-xs text-gray-500">
              Enter any Sepolia contract address to analyze
            </p>
          </div>
          <button
            type="submit"
            disabled={loading || !contractAddress}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-xl transition-all glow shadow-lg shadow-purple-500/50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                🔍 Analyze Contract
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto rounded-xl border border-red-500/50 bg-red-500/10 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚠️</div>
            <div className="flex-1">
              <p className="text-red-400 font-semibold">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-400 hover:text-red-300 font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {result && (
        <div className="animate-fadeIn">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Analysis Results
            </h2>
            <button
              onClick={() => navigate('/')}
              className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              New Analysis
            </button>
          </div>
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
