import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import { Poll } from '../../components/polls/PollList';
import { WalletContext } from '../../components/providers/WalletConnector';
import { getTimeFromBlockNumber } from '../getTimeFromBlockNumber';
import shortenAddress from '../shortenAddress';
import createContract from '../createContract';
import { VotrPoll } from '../../contracts/@types/VotrPoll';
import VotrPollJson from '../../contracts/VotrPoll.json';

export const useCreatedPollsByAccount = (): [Poll[], boolean] => {
  const { pollFactory } = useContext(VotrContractsContext);
  const { account, ethereum } = useContext(WalletContext);
  const [isLoading, setIsLoading] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (!pollFactory) {
      return;
    }
    setIsLoading(true);
    pollFactory
      .getPastEvents('PollCreated', { fromBlock: 0, filter: { owner: account } })
      .then(async (res) => {
        const pollsData = await Promise.all(
          res.map(async (event) => {
            const pollContract = createContract<VotrPoll>(ethereum, VotrPollJson.abi, event.returnValues.pollAddress);
            const endDate = +(await pollContract.methods.endDate().call());
            const pollData: Poll = {
              address: shortenAddress(event.returnValues.pollAddress),
              creator: shortenAddress(event.returnValues.owner),
              link: `/polls/${event.returnValues.pollAddress}`,
              startDate: await getTimeFromBlockNumber(ethereum, event.blockNumber),
              endDate,
              status: endDate > +new Date() ? 'Active' : 'Ended',
              title: await pollContract.methods.title().call(),
            };
            return pollData;
          })
        );
        setPolls(pollsData);
        setIsLoading(false);
      })
      .catch(() => toast.error('something went wrong while fetching polls'));
  }, [pollFactory, account]);

  return [polls, isLoading];
};
