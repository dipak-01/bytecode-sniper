import { ethers } from 'ethers';
import networkConfig from '../config/network.json';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  explorerUrl: string;
}

class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet | null = null;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(networkConfig.network.rpcUrl);
  }

  /**
   * Initialize wallet from private key
   * In production, this would use MetaMask or WalletConnect
   */
  initializeWallet(privateKey: string) {
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  /**
   * Get wallet address
   */
  getAddress(): string {
    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }
    return this.wallet.address;
  }

  /**
   * Record intelligence purchase on Sepolia testnet
   * Creates a real blockchain transaction for transparency
   */
  async recordTransaction(
    requestId: string,
    providerAddress: string,
    amount: string
  ): Promise<Transaction> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized. Please connect wallet first.');
    }

    console.log('[Blockchain] Recording transaction on Sepolia testnet');
    console.log('Request ID:', requestId);
    console.log('Provider:', providerAddress);
    console.log('Amount:', amount, networkConfig.economic.currency);

    try {
      // Create transaction with metadata in the data field
      const metadata = ethers.hexlify(
        ethers.toUtf8Bytes(JSON.stringify({
          type: 'intelligence_purchase',
          requestId,
          timestamp: Date.now()
        }))
      );

      const tx = await this.wallet.sendTransaction({
        to: providerAddress,
        value: ethers.parseEther('0.0001'), // Small amount for testnet
        data: metadata
      });

      console.log('[Blockchain] Transaction sent:', tx.hash);
      console.log('[Blockchain] Waiting for confirmation...');

      const receipt = await tx.wait();

      if (!receipt) {
        throw new Error('Transaction receipt not available');
      }

      console.log('[Blockchain] Transaction confirmed in block:', receipt.blockNumber);

      const explorerUrl = `${networkConfig.network.explorerUrl}/tx/${tx.hash}`;

      return {
        hash: tx.hash,
        from: this.wallet.address,
        to: providerAddress,
        value: amount,
        timestamp: Date.now(),
        explorerUrl
      };
    } catch (error) {
      console.error('[Blockchain] Transaction failed:', error);
      throw error;
    }
  }

  /**
   * Get transaction details from hash
   */
  async getTransaction(txHash: string): Promise<ethers.TransactionResponse | null> {
    try {
      return await this.provider.getTransaction(txHash);
    } catch (error) {
      console.error('[Blockchain] Failed to fetch transaction:', error);
      return null;
    }
  }

  /**
   * Check wallet balance
   */
  async getBalance(): Promise<string> {
    if (!this.wallet) {
      return '0';
    }
    const balance = await this.provider.getBalance(this.wallet.address);
    return ethers.formatEther(balance);
  }

  /**
   * Validate Ethereum address
   */
  isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  /**
   * Get current network info
   */
  async getNetworkInfo() {
    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name
    };
  }
}

export default new BlockchainService();
