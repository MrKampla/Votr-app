import FirstPastThePostPollTypeJson from '../contracts/FirstPastThePostPollType.json';
import CumulativePollTypeJson from '../contracts/CumulativePollType.json';
import EvaluativePollTypeJson from '../contracts/EvaluativePollType.json';
import QuadraticPollTypeJson from '../contracts/QuadraticPollType.json';

export interface PollType {
  name: string;
  address: string;
}

type NetworkId = keyof typeof FirstPastThePostPollTypeJson.networks;

export const getPollTypeContractsForNetwork = (networkId: string): PollType[] => {
  return [
    {
      name: 'First past the post',
      address: FirstPastThePostPollTypeJson.networks[networkId as NetworkId].address,
    },
    {
      name: 'Cumulative',
      address: CumulativePollTypeJson.networks[networkId as NetworkId].address,
    },
    {
      name: 'Evaluative',
      address: EvaluativePollTypeJson.networks[networkId as NetworkId].address,
    },
    {
      name: 'Quadratic',
      address: QuadraticPollTypeJson.networks[networkId as NetworkId].address,
    },
  ];
};
