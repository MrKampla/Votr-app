import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import { Poll } from '../../components/polls/PollList';
import { WalletContext } from '../../components/providers/WalletConnector';
import { mapAddressToPollData } from '../mapAddressToPollData';
import { RequestStatus } from '../../constants/requestStatus';
import { CONTRACTS_DEPLOYMENT_BLOCK_NUMBER } from '../../constants/networks';

export const useCreatedPollsByAccount = (): [Poll[], RequestStatus] => {
  const { pollFactory, networkId } = useContext(VotrContractsContext);
  const { account, ethereum } = useContext(WalletContext);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (!pollFactory || !account) {
      return;
    }
    setStatus('loading');
    const getCreatedPollsByAccountQuery = pollFactory.filters.PollCreated(account);
    pollFactory
      .queryFilter(getCreatedPollsByAccountQuery, CONTRACTS_DEPLOYMENT_BLOCK_NUMBER)
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
        setStatus('success');
      })
      .catch(() => {
        toast.error('something went wrong while fetching polls');
        setStatus('error');
      });
  }, [pollFactory, account, ethereum, networkId]);

  return [polls, status];
};
