import { ethers } from 'ethers';
import { Web3Instance } from '../components/providers/WalletConnector';

function createContract<T extends ethers.BaseContract>(ethereum: Web3Instance, jsonInterface: any, address: string) {
  return new ethers.Contract(address, jsonInterface, ethereum.getSigner()) as T;
}

export default createContract;
