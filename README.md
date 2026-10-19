# Bytecode Sniper

Autonomous pre-trade bytecode analysis through the Telegraph Protocol.

## Overview

Bytecode Sniper is an autonomous security agent that purchases bytecode analysis and drainer detection intelligence through the Telegraph Protocol BEFORE executing trades. This helps protect DeFi traders from rug pulls and drainer attacks by providing real-time security analysis of smart contracts.

## Why This Wins

Based on Telegraph Protocol Hackathon Season I winners analysis:

1. **Mainnet Readiness (35%)** - Config-driven chain/token/price settings, works on cold start
2. **Commercial Viability (30%)** - Clear buyer (DeFi traders), replaces manual code review/security audits
3. **Verifiable Transactions (20%)** - On-chain Sepolia testnet transactions visible
4. **Network Usage (10%)** - Routes through Telegraph, not bypassed to direct APIs
5. **Novelty (5%)** - Autonomous pre-trade security embedded in trading workflow

## [Mechanism] Build Disclosure

This build uses **real Telegraph Protocol routing architecture** but **placeholder economic values** for demonstration. Mainnet deployment will use real USDC on Polygon or Solana with actual Telegraph provider marketplace integration.

**REAL:**
- Sepolia blockchain transactions
- Telegraph Protocol routing structure
- Autonomous agent logic

**PLACEHOLDER:**
- Economic values (0.10 USDC)
- Provider marketplace simulation

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── agents/
│   └── BytecodeAnalyzer.ts          # Autonomous analysis agent
├── components/
│   ├── AnalysisPanel.tsx            # Main analysis UI
│   ├── TransactionDisplay.tsx       # Transaction transparency UI
│   ├── MechanismDisclosure.tsx      # [Mechanism] build notice
│   ├── ProviderRankings.tsx         # Telegraph provider display
│   └── VerdictCard.tsx              # SAFE/CAUTION/BLOCK results
├── config/
│   └── network.json                 # Network and Telegraph settings
├── pages/
│   ├── Home.tsx                     # Landing page
│   └── Analyze.tsx                  # Analysis page
├── services/
│   ├── TelegraphService.ts          # Telegraph Protocol integration
│   ├── BlockchainService.ts         # Sepolia transaction handling
│   └── BytecodeAnalysisService.ts   # Contract bytecode fetching
├── utils/
│   └── vulnerabilityPatterns.ts     # Known vulnerability signatures
├── App.tsx                          # Root component with routing
└── index.css                        # TailwindCSS with custom theme
```

## Configuration

Edit `src/config/network.json` to configure:

```json
{
  "network": {
    "chainId": 11155111,
    "rpcUrl": "https://rpc.sepolia.org",
    "explorerUrl": "https://sepolia.etherscan.io"
  },
  "telegraph": {
    "apiUrl": "https://api.telegraphprotocol.com",
    "contractAddress": "0x..."
  },
  "economic": {
    "currency": "USDC",
    "analysisCost": "0.10"
  }
}
```

## How It Works

1. **Input Address** - Enter contract address to analyze
2. **Telegraph Routing** - Route request through Telegraph Protocol
3. **Purchase Intelligence** - Buy bytecode analysis from ranked providers
4. **Get Verdict** - Receive SAFE/CAUTION/BLOCK result with detailed reasoning

## Transaction Transparency

Every intelligence purchase generates a real Sepolia transaction with:
- Clickable transaction hash (link to sepolia.etherscan.io)
- Provider address and cost
- Timestamp and request ID

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: TailwindCSS
- **Blockchain**: ethers.js (Sepolia testnet)
- **HTTP**: axios
- **Routing**: react-router-dom

## Deployment

This project is designed for deployment to Vercel:

1. Push code to GitHub repository
2. Import project to Vercel
3. Configure environment variables
4. Deploy

## Submission Materials

### Demo Video (≤60 seconds)

1. **Problem**: Rug pulls cost traders millions
2. **Solution**: Autonomous pre-trade bytecode analysis via Telegraph
3. **Telegraph advantage**: Ranked, competing intelligence providers

### Commercial Summary

**Who buys it:**
- DeFi traders
- Trading bots
- Wallet apps

**What it replaces:**
- Manual code review ($500-2000/audit)
- Blind trust

**Pricing model:**
- $0.10-0.50 per analysis (micro-transaction)

## License

MIT
