import VotrPollFactoryContract from '../contracts/VotrPollFactory.json';

export const isNetworkSupported = (networkId: string) =>
  networkId ? !Object.keys(VotrPollFactoryContract.networks).includes(networkId) : true;
