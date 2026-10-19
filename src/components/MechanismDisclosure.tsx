export function MechanismDisclosure() {
  return (
    <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">ℹ️</span>
        <div>
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
            [Mechanism Build] Disclosure
          </h4>
          <p className="text-sm text-purple-800 dark:text-purple-200 leading-relaxed">
            This build uses <strong>real Telegraph Protocol routing architecture</strong> but
            <strong> placeholder economic values</strong> for demonstration.
            Mainnet deployment will use real USDC on Polygon or Solana with actual Telegraph
            provider marketplace integration.
          </p>
          <div className="mt-3 space-y-1 text-xs text-purple-700 dark:text-purple-300">
            <p>✅ <strong>REAL:</strong> Sepolia blockchain transactions</p>
            <p>✅ <strong>REAL:</strong> Telegraph Protocol routing structure</p>
            <p>⚠️ <strong>PLACEHOLDER:</strong> Economic values (0.10 USDC)</p>
            <p>⚠️ <strong>PLACEHOLDER:</strong> Provider marketplace simulation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
