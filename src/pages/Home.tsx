import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="py-20 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold">
          🏆 Telegraph Protocol Hackathon Season II
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
          Bytecode Sniper
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Autonomous pre-trade bytecode analysis powered by Telegraph Protocol.
          <br />
          <span className="text-gray-500">Verify contract safety before executing trades.</span>
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/analyze')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-lg font-semibold rounded-lg transition-all glow shadow-lg shadow-purple-500/50"
          >
            🎯 Analyze Contract Now
          </button>
          <a
            href="https://hackathon.telegraphprotocol.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-purple-500/30 text-gray-200 text-lg font-semibold rounded-lg transition-all"
          >
            Telegraph Protocol ↗
          </a>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 backdrop-blur-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-red-400 mb-6">
            The Problem
          </h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold mt-1">•</span>
              <span>
                Onchain traders commit <strong className="text-white">millions in capital</strong> without verifying bytecode safety
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold mt-1">•</span>
              <span><strong className="text-white">Rug pulls and drainer attacks</strong> cost traders millions annually</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold mt-1">•</span>
              <span>Manual code review is <strong className="text-white">expensive ($500-2000 per audit)</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold mt-1">•</span>
              <span>Blind trust = <strong className="text-white">lost capital</strong></span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-8 backdrop-blur-sm">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-green-400 mb-6">
            The Solution
          </h2>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-green-400 font-bold mt-1">•</span>
              <span>
                <strong className="text-white">Autonomous agent</strong> purchases bytecode analysis via Telegraph Protocol
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 font-bold mt-1">•</span>
              <span>
                <strong className="text-white">Real-time</strong> drainer detection and vulnerability scanning
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 font-bold mt-1">•</span>
              <span>
                <strong className="text-white">Transparent Sepolia transactions</strong> with clickable proofs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 font-bold mt-1">•</span>
              <span><strong className="text-white">SAFE/CAUTION/BLOCK</strong> verdicts with detailed reasoning</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-12 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', icon: '📝', title: 'Input Address', desc: 'Enter the smart contract address you want to analyze' },
            { step: '2', icon: '🔀', title: 'Telegraph Routing', desc: 'Route intelligence request through Telegraph Protocol validators' },
            { step: '3', icon: '💎', title: 'Purchase Intelligence', desc: 'Buy bytecode analysis from ranked providers' },
            { step: '4', icon: '✨', title: 'Get Verdict', desc: 'Receive SAFE/CAUTION/BLOCK result with proof' }
          ].map((item) => (
            <div key={item.step} className="text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 glow">
                {item.step}
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Telegraph Advantage */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Why Telegraph Protocol?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl bg-gray-800/30 border border-purple-500/20">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-semibold text-white mb-2">Ranked Providers</h3>
            <p className="text-sm text-gray-400">Validators rank intelligence providers by accuracy and reliability</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800/30 border border-purple-500/20">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-white mb-2">Micro-Transactions</h3>
            <p className="text-sm text-gray-400">x402 protocol enables pay-per-query with zero overhead</p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800/30 border border-purple-500/20">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-white mb-2">Full Transparency</h3>
            <p className="text-sm text-gray-400">Every transaction recorded on-chain with verifiable proof</p>
          </div>
        </div>
      </div>
    </div>
  );
}
