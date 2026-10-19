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
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-700 dark:text-green-400',
          icon: '🛡️',
          label: 'VERDICT: SAFE'
        };
      case 'CAUTION':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-700 dark:text-yellow-400',
          icon: '⚠️',
          label: 'VERDICT: CAUTION'
        };
      case 'BLOCK':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-700 dark:text-red-400',
          icon: '🛑',
          label: 'VERDICT: BLOCK'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`rounded-xl border p-6 ${styles.bg} ${styles.border}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{styles.icon}</span>
          <div>
            <h3 className={`text-2xl font-bold ${styles.text}`}>{styles.label}</h3>
            <p className="mt-1 text-sm opacity-80">
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        {contractAddress && (
          <div className="text-right">
            <p className="text-xs opacity-70">Contract</p>
            <p className="font-mono text-sm opacity-90">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
