import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="py-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Bytecode Sniper
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Autonomous pre-trade bytecode analysis through the Telegraph Protocol.
          Protect your capital by verifying contract safety before executing trades.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/analyze')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Analyze Contract
          </button>
          <a
            href="https://hackathon.telegraphprotocol.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors"
          >
            Telegraph Protocol
          </a>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 p-6">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">
            ⚠️ The Problem
          </h2>
          <ul className="space-y-3 text-red-700 dark:text-red-300">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Onchain traders commit millions without verifying bytecode safety
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Rug pulls and drainer attacks cost traders millions annually</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Manual code review is expensive ($500-2000 per audit)</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Blind trust leads to lost capital</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10 p-6">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4">
            ✅ The Solution
          </h2>
          <ul className="space-y-3 text-green-700 dark:text-green-300">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Autonomous agent purchases bytecode analysis via Telegraph Protocol
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Real-time drainer detection and vulnerability scanning
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>
                Transparent Sepolia transactions with clickable proofs
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>SAFE/CAUTION/BLOCK verdicts with detailed reasoning</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Input Address', desc: 'Enter contract address to analyze' },
            { step: '2', title: 'Telegraph Routing', desc: 'Route through Telegraph Protocol' },
            { step: '3', title: 'Purchase Intelligence', desc: 'Buy bytecode analysis' },
            { step: '4', title: 'Get Verdict', desc: 'Receive SAFE/CAUTION/BLOCK result' }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
