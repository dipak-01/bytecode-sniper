interface VerdictCardProps {
  verdict: 'SAFE' | 'CAUTION' | 'BLOCK';
  confidence: number;
  contractAddress?: string;
}

export function VerdictCard({ verdict, confidence, contractAddress }: VerdictCardProps) {
  const getStyles = () => {
    switch (verdict) {
      case 'SAFE':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/50',
          text: 'text-green-400',
          glow: 'shadow-lg shadow-green-500/50',
          icon: '🛡️',
          label: 'VERDICT: SAFE'
        };
      case 'CAUTION':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/50',
          text: 'text-yellow-400',
          glow: 'shadow-lg shadow-yellow-500/50',
          icon: '⚠️',
          label: 'VERDICT: CAUTION'
        };
      case 'BLOCK':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/50',
          text: 'text-red-400',
          glow: 'shadow-lg shadow-red-500/50',
          icon: '🛑',
          label: 'VERDICT: BLOCK'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`rounded-2xl border p-8 ${styles.bg} ${styles.border} ${styles.glow} backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-6xl">{styles.icon}</span>
          <div>
            <h3 className={`text-3xl font-bold ${styles.text} mb-2`}>{styles.label}</h3>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-gray-800/50 rounded-full">
                <p className="text-sm text-gray-300">
                  Confidence: <span className="font-bold text-white">{(confidence * 100).toFixed(1)}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {contractAddress && (
          <div className="text-right bg-gray-800/30 px-4 py-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Contract Address</p>
            <p className="font-mono text-sm text-gray-300">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
