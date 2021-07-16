import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import { Poll } from '../../components/polls/PollList';
import { WalletContext } from '../../components/providers/WalletConnector';
import { mapAddressToPollData } from '../mapAddressToPollData';

export const useCreatedPollsByAccount = (): [Poll[], boolean] => {
  const { pollFactory, networkId } = useContext(VotrContractsContext);
  const { account, ethereum } = useContext(WalletContext);
  const [isLoading, setIsLoading] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (!pollFactory || !account) {
      return;
    }
    setIsLoading(true);
    const getCreatedPollsByAccountQuery = pollFactory.filters.PollCreated(account);
    pollFactory
      .queryFilter(getCreatedPollsByAccountQuery, 0)
      .then(async (events) => {
        const pollsData = await Promise.all(
          events.map(async ({ args: { owner, pollAddress }, blockNumber }) => {
            return mapAddressToPollData({
              ethereum,
              pollAddress,
              blockNumber,
              owner,
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
