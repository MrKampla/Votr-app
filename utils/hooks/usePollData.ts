import { useCallback, useContext, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import merge from 'lodash/merge';
import { WalletContext } from '../../components/providers/WalletConnector';
import { RequestStatus } from '../../constants/requestStatus';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import createContract from '../createContract';
import VotrPollContract from '../../contracts/VotrPoll.json';
import IPollTypeContract from '../../contracts/IPollType.json';
import ERC20Contract from '../../contracts/ERC20.json';
import { ERC20, IPollType, VotrPoll } from '../../contracts/@types';
import { CreatePollStore } from '../../components/create/createPollReducer';
import { TypedEvent } from '../../contracts/@types/commons';
import { ERC20Token } from '../../components/create/UnderlyingTokenModal';
import toast from 'react-hot-toast';

interface Vote {
  voterAddress: string;
  choiceId: number;
  amount: number;
}

interface Choice {
  id: number;
  value: string;
  amount: number;
  votePercantage: number;
}

type ERC20TokenWithBalance = ERC20Token & { balance: string };

type PollDetails = Omit<CreatePollStore, 'voters' | 'choices'> & {
  votes: Vote[];
  choices: Choice[];
  isCallbackCalled: boolean;
  quorumReached: boolean;
  isFinished: boolean;
  underlyingToken?: ERC20TokenWithBalance;
};

export const usePollData = (pollAddress: string): [PollDetails | undefined, RequestStatus, () => Promise<void>] => {
  const { ethereum, account } = useContext(WalletContext);
  const { networkId, pollFactory } = useContext(VotrContractsContext);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [poll, setPoll] = useState<PollDetails | undefined>(undefined);

  const refresh = useCallback(async () => {
    if (!poll) {
      return;
    }
    const pollContract = createContract<VotrPoll>(ethereum, VotrPollContract.abi, pollAddress);
    const votesInParticularPollFilter = pollFactory!.filters.Voted(pollAddress);
    setStatus('loading');
    try {
      const [choices, voteEvents, isCallbackCalled, balance, { finished, quorumReached }] = await Promise.all([
        getAllChoices(pollContract),
        pollFactory!.queryFilter(votesInParticularPollFilter),
        pollContract.isCallbackCalled(),
        pollContract.balanceOf(account),
        pollContract.isFinished(),
      ]);
      setPoll({
        ...poll!,
        choices,
        isFinished: finished,
        quorumReached,
        votes: mapVoteEventToVotes(voteEvents),
        isCallbackCalled,
        underlyingToken: {
          ...poll.underlyingToken!,
          balance: balance.toString(),
        },
      });
    } catch (err) {
      toast.error(err.data.message);
      setStatus('error');
      return;
    }
    setStatus('success');
  }, [account, ethereum, poll, pollAddress, pollFactory]);

  const getTokenData = useCallback(
    async (underlyingTokenAddress: string): Promise<ERC20TokenWithBalance> => {
      const underlyingTokenContract = createContract<ERC20>(ethereum, ERC20Contract.abi, pollAddress);
      try {
        const token = {
          address: underlyingTokenAddress,
          name: await underlyingTokenContract.name(),
          symbol: await underlyingTokenContract.symbol(),
          balance: (await underlyingTokenContract.balanceOf(account)).toString(),
        };
        return token;
      } catch {
        return {
          address: underlyingTokenAddress,
          name: 'unknown vToken',
          symbol: 'UVTK',
          balance: (await underlyingTokenContract.balanceOf(account)).toString(),
        };
      }
    },
    [account, ethereum, pollAddress]
  );

  useEffect(() => {
    if (!pollAddress || !ethereum || !pollFactory) {
      return;
    }
    setStatus('loading');
    async function fetchPollData() {
      const pollContract = createContract<VotrPoll>(ethereum, VotrPollContract.abi, pollAddress);
      const votesInParticularPollFilter = pollFactory!.filters.Voted(pollAddress);
      const [
        title,
        description,
        quorum,
        isVoteDelegationAllowed,
        pollTypeAddress,
        underlyingTokenAddress,
        callbackAddress,
        endDate,
        isCallbackCalled,
        voteEvents,
      ] = await Promise.all([
        pollContract.title(),
        pollContract.description(),
        pollContract.quorum(),
        pollContract.allowVoteDelegation(),
        pollContract.pollType(),
        pollContract.underlying(),
        pollContract.callbackAddress(),
        pollContract.endDate(),
        pollContract.isCallbackCalled(),
        pollFactory!.queryFilter(votesInParticularPollFilter),
      ]);

      const pollTypeContract = createContract<IPollType>(ethereum, IPollTypeContract.abi, pollTypeAddress);
      const [tokenData, pollTypeName, choices, { finished, quorumReached }] = await Promise.all([
        getTokenData(underlyingTokenAddress),
        pollTypeContract.getPollTypeName(),
        getAllChoices(pollContract),
        pollContract.isFinished(),
      ]);
      setPoll({
        title,
        description,
        quorum: quorum.toNumber(),
        isVoteDelegationAllowed,
        callbackAddress,
        endDate: new Date(endDate.toNumber() * 1000).toISOString(),
        underlyingToken: tokenData,
        pollType: {
          address: pollTypeAddress,
          description: '',
          name: pollTypeName,
        },
        votes: mapVoteEventToVotes(voteEvents),
        choices,
        isCallbackCalled,
        isFinished: finished,
        quorumReached,
      });
      setStatus('success');
    }
    fetchPollData().catch(() => {
      setStatus('error');
      toast.error('Something went wrong while fetching data about poll');
    });
  }, [ethereum, getTokenData, networkId, pollAddress, pollFactory]);
  return [poll, status, refresh];
};

function mapVoteEventToVotes(
  events: TypedEvent<
    [string, string, BigNumber[], BigNumber[]] & {
      pollAddress: string;
      who: string;
      choices: BigNumber[];
      votesAmount: BigNumber[];
    }
  >[]
): Vote[] {
  return events.reduce((acc: Vote[], event) => {
    const voterAddress = event.args.who;
    const choicesWithVoterAddress = event.args.choices.map((choice) => ({ choiceId: choice.toNumber(), voterAddress }));
    const voteAmounts = event.args.votesAmount.map((amount) => ({ amount: amount.toNumber() }));
    const votes = merge(choicesWithVoterAddress, voteAmounts);

    return [...acc, ...votes];
  }, []);
}

async function getAllChoices(pollContract: VotrPoll): Promise<Choice[]> {
  const amountOfChoicesWithVoteCount = (await pollContract.getAmountOfVotesForChoices()).map((voteCount) =>
    voteCount.toNumber()
  );
  const sumOfAllVotesCast = amountOfChoicesWithVoteCount.reduce((acc, curr) => acc + curr, 0);
  const names = await Promise.all(amountOfChoicesWithVoteCount.map((_, id) => pollContract.choices(id)));
  return merge(
    amountOfChoicesWithVoteCount.map((voteCount, id) => ({
      id,
      amount: voteCount,
      votePercantage: calculatePercantageShare(sumOfAllVotesCast, voteCount),
    })),
    names.map((name) => ({ value: name }))
  ) as Choice[];
}

function calculatePercantageShare(sum: number, part: number): number {
  const share = part / sum;
  return isNaN(share) ? 0 : +(share * 100).toFixed(0);
}
