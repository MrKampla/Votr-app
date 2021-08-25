export const NETWORK_NAMES = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
  56: 'bnb',
  137: 'polygon',
};

export const CONTRACTS_DEPLOYMENT_BLOCK_NUMBER = Number(process.env.NEXT_PUBLIC_CONTRACTS_DEPLOYMENT_BLOCK_NUMBER ?? 0);
