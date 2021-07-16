import { ethers } from 'ethers';

export const generateLinkToEtherscan = async (transactionHash: string) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const network = await provider.getNetwork();
  const protocol = 'https://';
  const baseUrl = `etherscan.io/tx/${transactionHash}`;
  if (network.name === 'homestead' || network.name === 'unknown') {
    return `${protocol}${baseUrl}`;
  }
  return `${protocol}${network.name}${baseUrl}`;
};
