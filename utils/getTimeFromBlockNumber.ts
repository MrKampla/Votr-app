import { Web3Instance } from '../components/providers/WalletConnector';

export const getTimeFromBlockNumber = async (ethereum: Web3Instance, blockNumber: number) => {
  return (await ethereum.getBlock(blockNumber)).timestamp * 1000;
};
