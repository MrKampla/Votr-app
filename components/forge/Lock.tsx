import React, { useContext, useState } from 'react';
import {
  LockerContainer,
  ValueInput,
  BigMultiplier,
  UtilityButton,
  CenteringContainer,
  Field,
  TokenBalanceWrapper,
  TokenBalanceLabel,
  Row,
  AllowanceDescriptor,
} from '../styled/forge/Forge';
import { ActionButton, DisabledButton } from '../styled/homepage';
import { CarouselItem } from '../styled/homepage/Carousel';
import useToken from '../../utils/hooks/useToken';
import createContract from '../../utils/createContract';
import { ERC20, VotrPoll } from '../../contracts/@types';
import { WalletContext } from '../providers/WalletConnector';
import VotrPollContract from '../../contracts/VotrPoll.json';
import ERC20Contract from '../../contracts/ERC20.json';
import { generateTransactionToast } from '../../utils/generateTransactionToast';
import { VotrContractsContext } from '../providers/ContractInitializer';
import toast from 'react-hot-toast';
import { SECONDS_IN_WEEK, calculateMultiplierForLockupPeriod } from '../../constants/lockingLogic';

function Lock({
  initialPollAddress,
  initialTokenAddress,
}: {
  initialPollAddress: string;
  initialTokenAddress: string;
}) {
  const [pollAddress, setPollAddress] = useState(initialPollAddress as string);
  const [tokenAddress, setTokenAddress] = useState(initialTokenAddress as string);
  const [amountOfTokensToLock, setAmountOfTokensToLock] = useState('0');
  const [lockingPeriod, setLockingPeriod] = useState(0);
  const { ethereum } = useContext(WalletContext);
  const { networkId } = useContext(VotrContractsContext);

  const { symbol, tokenBalance, tokenAllowance, refresh } = useToken({ tokenAddress, checkAllowanceFor: pollAddress });

  const isSufficientAmountApproved = +tokenAllowance >= +amountOfTokensToLock;

  const approve = async () => {
    const pollContract = createContract<ERC20>(ethereum, ERC20Contract.abi, tokenAddress);
    try {
      const tx = await pollContract.approve(pollAddress, amountOfTokensToLock);
      const txReceipt = tx.wait();
      generateTransactionToast(txReceipt, tx.hash, networkId!);
      await txReceipt;
      refresh();
    } catch (err) {
      toast.error(err.data?.message ?? err.message);
      return;
    }
  };

  const lock = async () => {
    const pollContract = createContract<VotrPoll>(ethereum, VotrPollContract.abi, pollAddress);
    const lockEndDate = lockingPeriod ? Math.round(new Date().getTime() / 1000) + lockingPeriod * SECONDS_IN_WEEK : 0;
    try {
      const tx = await pollContract.lock(amountOfTokensToLock, lockEndDate);
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
            Poll address <ValueInput type="text" value={pollAddress} onChange={(e) => setPollAddress(e.target.value)} />
          </Field>
          <Field>
            Token address
            <ValueInput type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} /> <br />
          </Field>
          <Field>{symbol && <>Token symbol: {symbol}</>}</Field>
          <TokenBalanceWrapper>
            <TokenBalanceLabel>Amount of underlying tokens to lock</TokenBalanceLabel> token balance: {tokenBalance}
          </TokenBalanceWrapper>
          <Field>
            <Row>
              <ValueInput
                type="number"
                value={amountOfTokensToLock}
                onChange={(e) => setAmountOfTokensToLock(e.target.value)}
              />
              <UtilityButton margin="0 0 0 8px" onClick={() => setAmountOfTokensToLock(tokenBalance)}>
                MAX
              </UtilityButton>
            </Row>
          </Field>
          <Field>
            <AllowanceDescriptor
              isSuccess={isSufficientAmountApproved}
              onClick={() => setAmountOfTokensToLock(tokenAllowance)}
            >
              Allowance for poll: {tokenAllowance} {symbol}
            </AllowanceDescriptor>
          </Field>
          {!isSufficientAmountApproved && (
            <Field>
              <ActionButton fullWidth onClick={() => approve()}>
                Approve
              </ActionButton>
            </Field>
          )}
          <input type="range" max={156} value={lockingPeriod} onChange={(e) => setLockingPeriod(+e.target.value)} />
          <Field>
            <CenteringContainer>
              Lock duration: {lockingPeriod} {lockingPeriod === 1 ? 'week' : 'weeks'} <br />
            </CenteringContainer>
          </Field>
          <BigMultiplier>x{calculateMultiplierForLockupPeriod(lockingPeriod)}</BigMultiplier>
          Estimated amount of vTokens to receive:{' '}
          {+amountOfTokensToLock * +calculateMultiplierForLockupPeriod(lockingPeriod)}
          <CenteringContainer>
            {pollAddress && tokenAddress && +amountOfTokensToLock > 0 && isSufficientAmountApproved ? (
              <ActionButton fullWidth onClick={() => lock()}>
                Lock
              </ActionButton>
            ) : (
              <DisabledButton fullWidth>Lock</DisabledButton>
            )}
          </CenteringContainer>
        </LockerContainer>
      </CenteringContainer>
    </CarouselItem>
  );
}

export default Lock;
