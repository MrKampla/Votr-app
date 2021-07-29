import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Poll } from '../../components/polls/PollList';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import { WalletContext } from '../../components/providers/WalletConnector';
import { mapAddressToPollData } from '../mapAddressToPollData';
import { RequestStatus } from '../../constants/requestStatus';

export const usePollsInWhichAccountVoted = (): [Poll[], RequestStatus] => {
  const { pollFactory, networkId } = useContext(VotrContractsContext);
  const { account, ethereum } = useContext(WalletContext);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (!pollFactory || !account) {
      return;
    }
    setStatus('loading');
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
        setPolls(pollsData.reverse().filter(onlyUniquePollsFilter));
        setStatus('success');
      })
      .catch(() => {
        toast.error('something went wrong while fetching polls');
        setStatus('error');
      });
  }, [pollFactory, account, ethereum, networkId]);
  return [polls, status];
};

const onlyUniquePollsFilter = (poll: Poll, index: number, arr: Poll[]) =>
  index === arr.findIndex((t) => t.address === poll.address);
