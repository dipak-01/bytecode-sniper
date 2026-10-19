import telegraphService from '../services/TelegraphService';
import blockchainService from '../services/BlockchainService';
import bytecodeAnalysisService from '../services/BytecodeAnalysisService';
import { analyzeBytecode, getVerdict, generateReasoning } from '../utils/vulnerabilityPatterns';
import networkConfig from '../config/network.json';

export interface AnalysisResult {
  contractAddress: string;
  verdict: 'SAFE' | 'CAUTION' | 'BLOCK';
  confidence: number;
  findings: string[];
  reasoning: string;
  transactionHash: string | null;
  providerId: string | null;
  timestamp: number;
}

export interface AnalysisRequest {
  contractAddress: string;
  requestId: string;
}

class BytecodeAnalyzer {
  /**
   * Autonomous analysis agent that:
   * 1. Fetches contract bytecode from blockchain
   * 2. Routes intelligence purchase through Telegraph Protocol
   * 3. Analyzes bytecode for vulnerabilities
   * 4. Records transaction on Sepolia testnet
   * 5. Returns comprehensive analysis results
   */
  async analyze(request: AnalysisRequest): Promise<AnalysisResult> {
    console.log('[BytecodeAnalyzer] Starting autonomous analysis');
    console.log('Contract:', request.contractAddress);
    console.log('Request ID:', request.requestId);

    // Step 1: Validate address format
    if (!bytecodeAnalysisService.isValidAddress(request.contractAddress)) {
      return {
        contractAddress: request.contractAddress,
        verdict: 'BLOCK',
        confidence: 0,
        findings: ['Invalid Ethereum address format'],
        reasoning: 'The provided address is not a valid Ethereum address',
        transactionHash: null,
        providerId: null,
        timestamp: Date.now()
      };
    }

    // Step 2: Fetch contract bytecode
    console.log('[BytecodeAnalyzer] Step 2: Fetching bytecode');
    let bytecodeData;
    try {
      bytecodeData = await bytecodeAnalysisService.getContractBytecode(request.contractAddress);
    } catch (error) {
      return {
        contractAddress: request.contractAddress,
        verdict: 'BLOCK',
        confidence: 0,
        findings: ['Failed to fetch bytecode from blockchain'],
        reasoning: 'Unable to retrieve contract bytecode. The address may not be a valid contract.',
        transactionHash: null,
        providerId: null,
        timestamp: Date.now()
      };
    }

    if (!bytecodeData.hasCode) {
      return {
        contractAddress: request.contractAddress,
        verdict: 'CAUTION',
        confidence: 0.5,
        findings: ['No bytecode found - address is an EOA, not a contract'],
        reasoning: 'This address represents an externally owned account (EOA), not a smart contract',
        transactionHash: null,
        providerId: null,
        timestamp: Date.now()
      };
    }

    // Step 3: Route through Telegraph Protocol for intelligence purchase
    console.log('[BytecodeAnalyzer] Step 3: Purchasing intelligence through Telegraph');
    const telegraphRequest = {
      intentId: networkConfig.intents.bytecodeAnalysis,
      contractAddress: request.contractAddress,
      requestId: request.requestId
    };

    let transactionHash: string | null = null;
    let providerId: string | null = null;

    try {
      await telegraphService.purchaseIntelligence(telegraphRequest);
      console.log('[BytecodeAnalyzer] Intelligence purchased successfully');

      // Step 4: Record transaction on Sepolia testnet
      console.log('[BytecodeAnalyzer] Step 4: Recording transaction on blockchain');
      const providers = await telegraphService.getProviders(telegraphRequest.intentId);
      const topProvider = providers[0];

      const tx = await blockchainService.recordTransaction(
        request.requestId,
        topProvider.address,
        topProvider.cost
      );

      transactionHash = tx.hash;
      providerId = topProvider.id;
      console.log('[BytecodeAnalyzer] Transaction recorded:', tx.hash);

    } catch (error) {
      console.warn('[BytecodeAnalyzer] Telegraph/integration failed, proceeding with local analysis:', error);
      // Continue with local analysis even if Telegraph integration fails
    }

    // Step 5: Analyze bytecode for vulnerabilities
    console.log('[BytecodeAnalyzer] Step 5: Analyzing bytecode');
    const analysis = analyzeBytecode(bytecodeData.bytecode);
    const verdict = getVerdict(analysis);

    // Step 6: Generate reasoning
    const reasoning = generateReasoning(analysis);

    // Add Telegraph transaction info to findings
    const findings = [...analysis.cautions, ...analysis.blockers];
    if (transactionHash) {
      findings.push(`Intelligence purchased via Telegraph - Tx: ${transactionHash}`);
    } else {
      findings.push('Local-only analysis (Telegraph integration unavailable)');
    }

    // Calculate confidence based on findings
    const totalIssues = analysis.cautions.length + analysis.blockers.length;
    let confidence = 1.0;
    if (verdict === 'CAUTION') {
      confidence = 0.7;
    } else if (verdict === 'BLOCK') {
      confidence = 0.3;
    }
    confidence -= (totalIssues * 0.05);

    return {
      contractAddress: request.contractAddress,
      verdict,
      confidence: Math.max(0, confidence),
      findings,
      reasoning,
      transactionHash,
      providerId,
      timestamp: Date.now()
    };
  }

  /**
   * Batch analyze multiple contracts
   */
  async analyzeBatch(requests: AnalysisRequest[]): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    for (const request of requests) {
      try {
        const result = await this.analyze(request);
        results.push(result);
      } catch (error) {
        console.error('[BytecodeAnalyzer] Batch analysis failed:', error);
        results.push({
          contractAddress: request.contractAddress,
          verdict: 'BLOCK',
          confidence: 0,
          findings: ['Analysis failed'],
          reasoning: error instanceof Error ? error.message : 'Unknown error',
          transactionHash: null,
          providerId: null,
          timestamp: Date.now()
        });
      }
    }
    return results;
  }
}

export default new BytecodeAnalyzer();
