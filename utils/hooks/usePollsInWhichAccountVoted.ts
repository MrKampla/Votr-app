import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Poll } from '../../components/polls/PollList';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import { WalletContext } from '../../components/providers/WalletConnector';
import { mapAddressToPollData } from '../mapAddressToPollData';

export const usePollsInWhichAccountVoted = (): [Poll[], boolean] => {
  const { pollFactory, networkId } = useContext(VotrContractsContext);
  const { account, ethereum } = useContext(WalletContext);
  const [isLoading, setIsLoading] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (!pollFactory || !account) {
      return;
    }
    setIsLoading(true);
    const getPollsInWhichAccountVotedQuery = pollFactory.filters.Voted(null, account);
    pollFactory
      .queryFilter(getPollsInWhichAccountVotedQuery, 0)
      .then(async (events) => {
        const pollsData = await Promise.all(
          events.map(async ({ args: { pollAddress }, blockNumber }) => {
            return mapAddressToPollData({
              ethereum,
              pollAddress,
              blockNumber,
            });
          })
        );
        setPolls(pollsData.reverse());
        setIsLoading(false);
      })
      .catch(() => toast.error('something went wrong while fetching polls'));
  }, [pollFactory, account, ethereum, networkId]);
  return [polls, isLoading];
};
