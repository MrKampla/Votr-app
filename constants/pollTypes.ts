import VotrPollFactoryJson from '../contracts/VotrPollFactory.json';
import FirstPastThePostPollTypeJson from '../contracts/FirstPastThePostPollType.json';
import CumulativePollTypeJson from '../contracts/CumulativePollType.json';
import EvaluativePollTypeJson from '../contracts/EvaluativePollType.json';
import QuadraticPollTypeJson from '../contracts/QuadraticPollType.json';

export interface PollType {
  name: string;
  address: string;
  description: string;
}

type NetworkId = keyof typeof VotrPollFactoryJson.networks;

export const getPollTypeContractsForNetwork = (networkId: string): PollType[] => {
  return [
    {
      name: 'First past the post',
      address: FirstPastThePostPollTypeJson.networks[networkId as NetworkId].address,
      description: 'Each person can only vote once for a single option',
    },
    {
      name: 'Cumulative',
      address: CumulativePollTypeJson.networks[networkId as NetworkId].address,
      description: 'Each person has many votes (specified at creation of the poll) and can vote for multiple options',
    },
    {
      name: 'Evaluative',
      address: EvaluativePollTypeJson.networks[networkId as NetworkId].address,
      description: 'Voter can express approval or disapproval for each option by giving it a rating (+1 or -1)',
    },
    {
      name: 'Quadratic',
      address: QuadraticPollTypeJson.networks[networkId as NetworkId].address,
      description:
        'Each voter has a different number of votes (specified at the creation of the pool) and can vote for multiple options but the cost of each subsequent vote is exponentially higher',
    },
  ];
};
