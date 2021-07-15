import { VotrPoll } from '../contracts/@types/VotrPoll';
import createContract from './createContract';
import VotrPollJson from '../contracts/VotrPoll.json';
import { Web3Instance } from '../components/providers/WalletConnector';
import { Poll } from '../components/polls/PollList';
import shortenAddress from './shortenAddress';
import { getTimeFromBlockNumber } from './getTimeFromBlockNumber';

interface MappingArguments {
  pollAddress: string;
  ethereum: Web3Instance;
  blockNumber: number;
  owner?: string;
}

export const mapAddressToPollData = async ({ pollAddress, ethereum, blockNumber, owner }: MappingArguments): Promise<Poll> => {
  const pollContract = createContract<VotrPoll>(ethereum, VotrPollJson.abi, pollAddress);
  const endDate = (await pollContract.endDate()).toNumber() * 1000;
  return {
    address: shortenAddress(pollAddress),
    creator: shortenAddress(owner ?? (await pollContract.chairman())),
    link: `/polls/${pollAddress}`,
    startDate: await getTimeFromBlockNumber(ethereum, blockNumber),
    endDate,
    status: endDate > +new Date() ? 'Active' : 'Ended',
    title: await pollContract.title(),
  } as Poll;
};
