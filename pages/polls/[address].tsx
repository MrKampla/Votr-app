import React, { useState, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import CallbackModal from '../../components/create/CallbackModal';
import FramedSection from '../../components/create/FramedSection';
import PollTypeModal from '../../components/create/PollTypeModal';
import UnderlyingTokenModal from '../../components/create/UnderlyingTokenModal';
import Navigation from '../../components/polls/Navigation';
import ReadOnlyListElement from '../../components/polls/vote/ReadOnlyListElement';
import { WalletContext } from '../../components/providers/WalletConnector';
import {
  BorderLessDatePicker,
  BorderLessDescription,
  BorderLessInput,
  BorderLessSelect,
  BoxColumn,
  InputsWrapper,
  SeparatedList,
  ThemedCheckbox,
  WrappableBoxColumn,
  WrappableUnFramedContainer,
} from '../../components/styled/create/Create';
import { FramedSectionButton, PropertiesElement } from '../../components/styled/create/FramedSection';
import { ActionButton, ContentWrapper, DisabledButton } from '../../components/styled/homepage';
import { Box } from '../../components/styled/homepage/index';
import {
  ExecuteCallbackWrapper,
  SelectableListElement,
  CallbackBlockerWrapper,
} from '../../components/styled/polls/vote/Vote';
import { VotrPoll } from '../../contracts/@types';
import createContract from '../../utils/createContract';
import { usePollData } from '../../utils/hooks/usePollData';
import VotrPollContract from '../../contracts/VotrPoll.json';
import { generateTransactionToast } from '../../utils/generateTransactionToast';
import VotingResult from '../../components/polls/vote/VotingResult';
import AddressLink from '../../components/polls/vote/AddressLink';

const PollVotePage: React.FC = () => {
  const router = useRouter();
  const { ethereum } = useContext(WalletContext);
  const { address } = router.query;
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | undefined>(undefined);
  const [poll, pollDataStatus, refresh] = usePollData(address as string);
  const canCallbackBeCalled = !poll?.isCallbackCalled && poll?.quorumReached;

  const vote = useCallback(async () => {
    if (selectedChoiceId === undefined) {
      toast.error('First choose an option!');
      return;
    }
    const poll = createContract<VotrPoll>(ethereum, VotrPollContract.abi, address as string);
    try {
      const tx = await poll.vote([selectedChoiceId], [1]);
      const receiptPromise = tx.wait();
      generateTransactionToast(receiptPromise, tx.hash);
      await receiptPromise;
      refresh();
    } catch (err) {
      toast.error(err.data?.message ?? err.message);
      return;
    }
  }, [address, ethereum, refresh, selectedChoiceId]);

  const executeCallback = useCallback(async () => {
    const poll = createContract<VotrPoll>(ethereum, VotrPollContract.abi, address as string);
    const tx = await poll.callback();
    const receiptPromise = tx.wait();
    generateTransactionToast(receiptPromise, tx.hash);
  }, [address, ethereum]);

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <WrappableUnFramedContainer>
          <BoxColumn>
            <Box paddingMobile="8px">
              <InputsWrapper>
                <BorderLessInput value={poll?.title} translate="" disabled />
                <BorderLessDescription value={poll?.description} translate="" disabled />
              </InputsWrapper>
            </Box>
            <Box padding="16px 32px" paddingMobile="16px 0">
              <FramedSection title={'Choices'} minWidth="100%">
                <SeparatedList>
                  {poll?.choices.map((choice) => (
                    <SelectableListElement
                      key={choice.id}
                      isSelected={choice.id === selectedChoiceId}
                      onClick={() => setSelectedChoiceId(choice.id)}
                    >
                      {choice.value}
                    </SelectableListElement>
                  ))}
                  <FramedSectionButton onClick={vote}>VOTE</FramedSectionButton>
                </SeparatedList>
              </FramedSection>
            </Box>
            {poll?.votes?.length !== undefined && poll.votes.length > 0 ? (
              <Box padding="16px 32px 16px 32px" paddingMobile="16px 0">
                <FramedSection title="Votes" minWidth="100%">
                  <SeparatedList>
                    {poll?.votes.map((vote, id) => (
                      <ReadOnlyListElement
                        key={id}
                        id={id}
                        StartAdornment={<AddressLink address={vote.voterAddress} />}
                        value={poll.choices[vote.choiceId]?.value ?? vote.choiceId}
                        EndAdornment={<>{`${vote.amount} ${poll?.underlyingToken?.symbol}`}</>}
                      />
                    ))}
                  </SeparatedList>
                </FramedSection>
              </Box>
            ) : null}
          </BoxColumn>
          <WrappableBoxColumn width="480px">
            <Box padding="32px 32px 0 0" paddingMobile="16px 0">
              <FramedSection title={'Properties'} minWidth="100%">
                <SeparatedList>
                  <PropertiesElement break>
                    Poll type
                    <PollTypeModal isReadOnly={true} selectedValue={poll?.pollType} />
                  </PropertiesElement>
                  {poll?.underlyingToken?.address === ethers.constants.AddressZero ? null : (
                    <PropertiesElement break>
                      Token
                      <UnderlyingTokenModal isReadOnly={true} selectedValue={poll?.underlyingToken} />
                    </PropertiesElement>
                  )}
                  {poll?.callbackAddress === ethers.constants.AddressZero ? null : (
                    <PropertiesElement break>
                      Callback
                      <CallbackModal isReadOnly={true} selectedValue={poll?.callbackAddress} />
                    </PropertiesElement>
                  )}
                  <PropertiesElement break>
                    End date
                    <BorderLessDatePicker
                      disabled={true}
                      value={poll?.endDate.substring(0, 16)}
                      onChange={() => {}}
                      type="datetime-local"
                      margin="0 0 0 auto"
                    />
                  </PropertiesElement>
                  <PropertiesElement>
                    Quorum
                    <BorderLessSelect disabled={true} value={poll?.quorum} margin="0 2px 0 auto">
                      {[poll?.quorum].map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </BorderLessSelect>
                  </PropertiesElement>
                  <PropertiesElement>
                    Allow vote delegation
                    <ThemedCheckbox
                      checked={poll?.isVoteDelegationAllowed}
                      onChange={() => {}}
                      type="checkbox"
                      margin="0 4px 0 auto"
                    />
                  </PropertiesElement>
                </SeparatedList>
              </FramedSection>
            </Box>
            <Box padding="32px 32px 0 0" paddingMobile="16px 0">
              <FramedSection title={'Results'} minWidth="100%">
                <SeparatedList>
                  {poll?.choices.map((choice, id) => (
                    <PropertiesElement key={id} break>
                      <VotingResult
                        name={choice.value}
                        amount={choice.amount}
                        symbol={poll.underlyingToken!.symbol}
                        percent={choice.votePercantage}
                      />
                    </PropertiesElement>
                  ))}
                </SeparatedList>
              </FramedSection>
            </Box>
            {poll?.callbackAddress === ethers.constants.AddressZero ? undefined : (
              <Box padding="32px 32px 0 0" paddingMobile="16px 0">
                <FramedSection title={'Callback'} minWidth="100%">
                  {poll?.isCallbackCalled && (
                    <CallbackBlockerWrapper>Callback has already been executed</CallbackBlockerWrapper>
                  )}
                  {poll?.quorumReached !== undefined && !poll.quorumReached && (
                    <CallbackBlockerWrapper>Quorum not reached</CallbackBlockerWrapper>
                  )}
                  <ExecuteCallbackWrapper>
                    {canCallbackBeCalled ? (
                      <ActionButton margin="0" onClick={executeCallback}>
                        EXECUTE
                      </ActionButton>
                    ) : (
                      <DisabledButton margin="0">EXECUTE</DisabledButton>
                    )}
                  </ExecuteCallbackWrapper>
                </FramedSection>
              </Box>
            )}
          </WrappableBoxColumn>
        </WrappableUnFramedContainer>
      </ContentWrapper>
    </>
  );
};

export default PollVotePage;
