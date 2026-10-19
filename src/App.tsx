import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Analyze } from './pages/Analyze';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #16171d 100%)' }}>
        {/* Header */}
        <header className="border-b" style={{ borderColor: 'rgba(170, 59, 255, 0.2)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-2xl glow">
                  🎯
                </div>
                <div>
                  <span className="text-2xl font-bold gradient-text">
                    Bytecode Sniper
                  </span>
                  <div className="text-xs text-gray-500">Powered by Telegraph Protocol</div>
                </div>
              </Link>
              <nav className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/analyze"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all glow"
                >
                  Analyze Contract
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t mt-20" style={{ borderColor: 'rgba(170, 59, 255, 0.2)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Built for Telegraph Protocol Hackathon Season II • October 2026
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="https://hackathon.telegraphprotocol.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Telegraph Protocol ↗
                </a>
                <a
                  href="https://sepolia.etherscan.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Sepolia Explorer ↗
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
