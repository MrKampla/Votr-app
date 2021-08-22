import { useState, useEffect, useContext, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from '../../components/providers/WalletConnector';
import VotrPollContractJson from '../../contracts/VotrPoll.json';
import { VotrPoll } from '../../contracts/@types';
import createContract from '../createContract';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import { TypedEvent } from '../../contracts/@types/commons';
import { Result } from 'ethers/lib/utils';
import { RequestStatus } from '../../constants/requestStatus';

export interface Deposit {
  amountDeposited: string;
  startDate: number;
  endDate: number;
  isCurrent: boolean;
}
interface DepositEvent {
  depositor: string;
  amountDeposited: ethers.BigNumber;
  startDate: ethers.BigNumber;
  endDate: ethers.BigNumber;
}

function mapEventToDepositObject(depositEvent: TypedEvent<Result & DepositEvent>): Deposit {
  return {
    amountDeposited: depositEvent.args.amountDeposited.toString(),
    startDate: depositEvent.args.startDate.toNumber() * 1000,
    endDate: depositEvent.args.endDate.toNumber() * 1000,
    isCurrent: true,
  };
}

function useDeposits({ pollAddress }: { pollAddress: string }) {
  const { ethereum, account } = useContext(WalletContext);
  const { networkId } = useContext(VotrContractsContext);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  const refresh = useCallback(async () => {
    async function fetchDeposits() {
      if (ethers.utils.isAddress(pollAddress) && ethereum && account) {
        try {
          const pollContract = createContract<VotrPoll>(ethereum, VotrPollContractJson.abi, pollAddress);
          const getAllDepositEventsFromAddress = pollContract.filters.Deposited(account);
          pollContract.queryFilter(getAllDepositEventsFromAddress, 0).then(async (events) => {
            const depositObjects = events.map(mapEventToDepositObject);
            const currentDeposits = depositObjects.map(async (deposit) => {
              try {
                const currentDepositValue = await pollContract.userDeposits(account);

                return currentDepositValue.amountDeposited.toNumber() === 0
                  ? { ...deposit, isCurrent: false }
                  : deposit;
              } catch {
                return (null as unknown) as typeof deposit;
              }
            });
            setDeposits((await Promise.all(currentDeposits)).filter((x) => !!x));
          });
        } catch (err) {
          setDeposits([]);
        }
      }
    }
    setStatus('loading');
    fetchDeposits()
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [account, ethereum, pollAddress]);

  useEffect(() => {
    refresh();
  }, [account, ethereum, refresh, networkId]);

  return { deposits, status, refresh };
}

export default useDeposits;
