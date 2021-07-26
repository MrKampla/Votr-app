import { ethers } from 'ethers';

const generateLinkToEtherscan = async (data: string, type: string) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const network = await provider.getNetwork();
  const protocol = 'https://';
  const baseUrl = `etherscan.io/${type}/${data}`;
  if (network.name === 'homestead' || network.name === 'unknown') {
    return `${protocol}${baseUrl}`;
  }
  return `${protocol}${network.name}${baseUrl}`;
};

export const generateTransactionLinkToEtherscan = async (transactionHash: string) =>
  generateLinkToEtherscan(transactionHash, 'tx');

export const generateAddressLinkToEtherscan = async (account: string) => generateLinkToEtherscan(account, 'address');
