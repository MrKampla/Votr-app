import VotrPollFactoryContract from '../contracts/VotrPollFactory.json';

export const isNetworkSupported = (networkId: string = '') => Object.keys(VotrPollFactoryContract.networks).includes(networkId);
