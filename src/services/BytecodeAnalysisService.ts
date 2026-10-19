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
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(networkConfig.network.rpcUrl);
  }

  /**
   * Fetch contract bytecode from blockchain
   */
  async getContractBytecode(address: string): Promise<BytecodeAnalysis> {
    console.log('[BytecodeAnalysis] Fetching bytecode for:', address);

    try {
      const bytecode = await this.provider.getCode(address);

      return {
        contractAddress: address,
        bytecode,
        bytecodeLength: bytecode.length,
        hasCode: bytecode !== '0x',
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('[BytecodeAnalysis] Failed to fetch bytecode:', error);
      throw new Error(`Failed to fetch bytecode: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate contract address format
   */
  isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  /**
   * Check if address is a contract (has code)
   */
  async isContract(address: string): Promise<boolean> {
    try {
      const code = await this.provider.getCode(address);
      return code !== '0x';
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
      const code = await this.provider.getCode(address);
      const balance = await this.provider.getBalance(address);

      return {
        address,
        hasCode: code !== '0x',
        bytecodeSize: code.length,
        balance: ethers.formatEther(balance),
        network: 'Sepolia'
      };
    } catch (error) {
      console.error('[BytecodeAnalysis] Failed to get contract info:', error);
      throw error;
    }
  }
}

export default new BytecodeAnalysisService();
