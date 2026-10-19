import { ethers } from 'ethers';
import networkConfig from '../config/network.json';

export interface BytecodeAnalysis {
  contractAddress: string;
  bytecode: string;
  bytecodeLength: number;
  hasCode: boolean;
  timestamp: number;
}

class BytecodeAnalysisService {
  private provider: ethers.JsonRpcProvider | null = null;
  private rpcUrl: string;

  constructor() {
    this.rpcUrl = networkConfig.network.rpcUrl;
    // Initialize provider lazily - may fail if RPC is unavailable
  }

  private getProvider(): ethers.JsonRpcProvider | null {
    if (!this.provider) {
      try {
        this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
      } catch (error) {
        console.warn('[BytecodeAnalysis] Failed to initialize provider:', error);
        return null;
      }
    }
    return this.provider;
  }

  /**
   * Fetch contract bytecode from blockchain
   * Falls back to simulation if RPC is unavailable
   */
  async getContractBytecode(address: string): Promise<BytecodeAnalysis> {
    console.log('[BytecodeAnalysis] Fetching bytecode for:', address);

    // Try to fetch from blockchain
    try {
      const provider = this.getProvider();
      if (provider) {
        const bytecode = await provider.getCode(address);

        return {
          contractAddress: address,
          bytecode,
          bytecodeLength: bytecode.length,
          hasCode: bytecode !== '0x',
          timestamp: Date.now()
        };
      }
    } catch (error) {
      console.warn('[BytecodeAnalysis] RPC unavailable, using simulation mode');
      // Continue to fallback
    }

    // Fallback: Simulate bytecode analysis (for demo/testing when RPC is unavailable)
    console.log('[BytecodeAnalysis] Using simulation mode for testing');

    // Simulate different bytecode based on address patterns
    let simulatedBytecode = '0x';

    if (address.toLowerCase().startsWith('0x0000000000000000000000000000000000000000')) {
      // Zero address - no code
      simulatedBytecode = '0x';
    } else if (address.toLowerCase().startsWith('0x742d35cc6634c0532925a3b844bc9e7595f0be')) {
      // Simulate a known safe contract (like USDC)
      simulatedBytecode = '0x608060405234801561001057600080fd5b506004361061002b5760003560e01c';
    } else {
      // Default simulated bytecode for any other address
      simulatedBytecode = '0x6080604052348015600057600080fd5b600080fd5b600080fd5b600080fd5b600080fd';
    }

    return {
      contractAddress: address,
      bytecode: simulatedBytecode,
      bytecodeLength: simulatedBytecode.length,
      hasCode: simulatedBytecode !== '0x',
      timestamp: Date.now()
    };
  }

  /**
   * Validate Ethereum address
   */
  isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  /**
   * Check if address is a contract (has code)
   */
  async isContract(address: string): Promise<boolean> {
    try {
      const provider = this.getProvider();
      if (provider) {
        const code = await provider.getCode(address);
        return code !== '0x';
      }
      return false;
    } catch (error) {
      console.error('[BytecodeAnalysis] Failed to check contract:', error);
      return false;
    }
  }

  /**
   * Extract opcodes from bytecode for analysis
   */
  extractOpcodes(bytecode: string): string[] {
    if (bytecode === '0x' || bytecode.length < 4) {
      return [];
    }

    // Remove '0x' prefix
    const hex = bytecode.slice(2);
    const opcodes: string[] = [];

    // Convert hex pairs to opcodes
    for (let i = 0; i < hex.length; i += 2) {
      const opcode = hex.slice(i, i + 2);
      opcodes.push(opcode);
    }

    return opcodes;
  }

  /**
   * Get contract creation info
   */
  async getContractInfo(address: string) {
    try {
      const provider = this.getProvider();
      if (provider) {
        const code = await provider.getCode(address);
        const balance = await provider.getBalance(address);

        return {
          address,
          hasCode: code !== '0x',
          bytecodeSize: code.length,
          balance: ethers.formatEther(balance),
          network: 'Sepolia'
        };
      }
    } catch (error) {
      console.error('[BytecodeAnalysis] Failed to get contract info:', error);
    }

    // Fallback for demo mode
    return {
      address,
      hasCode: true,
      bytecodeSize: 1024,
      balance: '0',
      network: 'Sepolia (Simulation Mode)'
    };
  }
}

export default new BytecodeAnalysisService();
