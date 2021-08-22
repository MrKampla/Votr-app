import { useContext, useMemo } from 'react';
import { VotrPoll } from '../../contracts/@types';
import createContract from '../../utils/createContract';
import useDeposits from '../../utils/hooks/useDeposits';
import { LoadingFallback } from '../homepage/LoadingIndicator';
import { VotrContractsContext } from '../providers/ContractInitializer';
import { WalletContext } from '../providers/WalletConnector';
import { ElementsList } from '../styled/create/VotrModalStyled';
import { CenteringContainer, Field, LockerContainer, ValueInput } from '../styled/forge/Forge';
import { ActionButton, DisabledButton } from '../styled/homepage';
import { CarouselItem } from '../styled/homepage/Carousel';
import { ForgeTab } from './Lock';
import VotrPollJson from '../../contracts/VotrPoll.json';
import { generateTransactionToast } from '../../utils/generateTransactionToast';
import toast from 'react-hot-toast';
import DepositCard from './DepositCard';

function Unlock({
  pollAddress,
  setPollAddress,
  tokenAddress,
  setTokenAddress,
  tokenData: { symbol, status: tokenStatus },
  deposits: { deposits, status: depositsStatus },
  refresh,
}: ForgeTab & {
  deposits: Omit<ReturnType<typeof useDeposits>, 'refresh'>;
}) {
  const { networkId } = useContext(VotrContractsContext);
  const { ethereum } = useContext(WalletContext);

  const sumOfAllTokensToUnlock = useMemo(
    () => deposits.reduce((sum, deposit) => (deposit.isCurrent ? sum + Number(deposit.amountDeposited) : sum), 0),
    [deposits]
  );

  const unlock = async () => {
    const pollContract = createContract<VotrPoll>(ethereum, VotrPollJson.abi, pollAddress);

    try {
      const tx = await pollContract.unlock();
      const txReceipt = tx.wait();
      generateTransactionToast(txReceipt, tx.hash, networkId!);
      await txReceipt;
      refresh();
    } catch (err) {
      toast.error(err.data?.message ?? err.message);
      return;
    }
  };

  return (
    <CarouselItem>
      <CenteringContainer>
        <LockerContainer>
          <Field>
            Poll address
            <ValueInput
              type="text"
              autoComplete="no"
              value={pollAddress}
              onChange={(e) => setPollAddress(e.target.value)}
            />
          </Field>
          <Field>
            Token address
            <ValueInput
              type="text"
              autoComplete="no"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </Field>
          Deposits:
          <ElementsList>
            <LoadingFallback isLoading={depositsStatus === 'loading' || tokenStatus === 'loading'} margin="16px 0">
              {deposits.map((deposit) => (
                <DepositCard key={deposit.startDate} deposit={deposit} symbol={symbol} />
              ))}
              {deposits?.length === 0 && (
                <Field>
                  <CenteringContainer>There were no deposits made for that poll!</CenteringContainer>
                </Field>
              )}
            </LoadingFallback>
          </ElementsList>
          {sumOfAllTokensToUnlock > 0 && (
            <div>
              Amount of all tokens to unlock: {sumOfAllTokensToUnlock} {symbol}
            </div>
          )}
          {pollAddress && tokenAddress && sumOfAllTokensToUnlock > 0 ? (
            <ActionButton fullWidth onClick={() => unlock()}>
              Unlock
            </ActionButton>
          ) : (
            <DisabledButton fullWidth>Unlock</DisabledButton>
          )}
        </LockerContainer>
      </CenteringContainer>
    </CarouselItem>
  );
}

export default Unlock;
