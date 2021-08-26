import { NETWORK_NAMES } from '../constants/networks';

const generateLinkToBlockchainExplorer = (data: string, type: string, networkId: number) => {
  const protocol = 'https://';
  const baseUrl = `.etherscan.io/${type}/${data}`;
  const networkName = NETWORK_NAMES[networkId as keyof typeof NETWORK_NAMES];
  if (!networkName || networkName === 'mainnet') {
    return `${protocol}${baseUrl}`;
  }
  return `${protocol}${networkName}${baseUrl}`;
};

export const generateTransactionLink = (transactionHash: string, networkId: number) =>
  generateLinkToBlockchainExplorer(transactionHash, 'tx', networkId);

export const generateAddressLink = (account: string, networkId: number) =>
  generateLinkToBlockchainExplorer(account, 'address', networkId);
