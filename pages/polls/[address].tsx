import React, { useState, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import Switch from 'react-switch';
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
  PropertiesWrapper,
  ChoicesTitleWrapper,
  MultivoteWrapper,
  ChoiceNameWrapper,
} from '../../components/styled/polls/vote/Vote';
import { VotrPoll } from '../../contracts/@types';
import createContract from '../../utils/createContract';
import { usePollData } from '../../utils/hooks/usePollData';
import VotrPollContract from '../../contracts/VotrPoll.json';
import { generateTransactionToast } from '../../utils/generateTransactionToast';
import VotingResult from '../../components/polls/vote/VotingResult';
import AddressLink from '../../components/polls/vote/AddressLink';
import BackToPollsLink from '../../components/polls/vote/BackToPollsLink';
import VoteConfirmationModal, { ModalHandle } from '../../components/polls/vote/VoteConfirmationModal';
import { ChipWrapper } from '../../components/styled/polls/Polls';
import { LoadingFallback } from '../../components/homepage/LoadingIndicator';
import { generateAddressLink } from '../../utils/generateLinkToEtherscan';
import { VotrContractsContext } from '../../components/providers/ContractInitializer';
import LinkToForge from '../../components/polls/vote/LinkToForge';

const PollVotePage: React.FC = () => {
  const router = useRouter();
  const { ethereum } = useContext(WalletContext);
  const { networkId } = useContext(VotrContractsContext);
  const { address } = router.query;
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | undefined>(undefined);
  const [isMultivote, setIsMultivote] = useState(false);
  const [votesForChoices, setVotesForChoices] = useState<Map<number, boolean>>(new Map());
  const [poll, pollDataStatus, refresh] = usePollData(address as string);
  const voteConfirmationModalRef = useRef<ModalHandle>(null);
  const canCallbackBeCalled = !poll?.isCallbackCalled && poll?.quorumReached && poll?.isFinished;

  const vote = async (votingPower: string = '0') => {
    const poll = createContract<VotrPoll>(ethereum, VotrPollContract.abi, address as string);
    try {
      const multiVotesArray = mapChoicesAndVotesToArray(votesForChoices);
      const [choices, votePowers] = isMultivote ? multiVotesArray : [[selectedChoiceId!], [votingPower]];
      const tx = await poll.vote(choices, votePowers);
      const receiptPromise = tx.wait();
      generateTransactionToast(receiptPromise, tx.hash, networkId!);
      await receiptPromise;
      refresh();
    } catch (err) {
      toast.error(err.data?.message ?? err.message);
      return;
    }
  };

  const startVoteProcedure = () => {
    if (selectedChoiceId === undefined && !isMultivote) {
      toast.error('Select an option first');
      return;
    }
    if (!isMultivote) {
      voteConfirmationModalRef.current?.toggleModal();
      return;
    }
    if (isMultivote && [...votesForChoices.values()].every((vote) => !vote)) {
      toast.error('Select at least one positive vote');
      return;
    }
    vote();
  };

  const executeCallback = async () => {
    const poll = createContract<VotrPoll>(ethereum, VotrPollContract.abi, address as string);
    try {
      const tx = await poll.callback();
      const receiptPromise = tx.wait();
      generateTransactionToast(receiptPromise, tx.hash, networkId!);
      await receiptPromise;
      refresh();
    } catch (err) {
      toast.error(err.data?.message ?? err.message);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Votr poll {address}</title>
      </Head>
      <Navigation />
      <ContentWrapper>
        <WrappableUnFramedContainer>
          <BoxColumn>
            <Box paddingMobile="8px">
              <InputsWrapper>
                <BackToPollsLink />
                <LoadingFallback isLoading={pollDataStatus === 'loading'}>
                  <BorderLessInput value={poll?.title} translate="" disabled />
                  <BorderLessDescription value={poll?.description} translate="" disabled />
                </LoadingFallback>
              </InputsWrapper>
            </Box>
            <Box padding="16px 32px" paddingMobile="16px 0">
              <FramedSection
                title={
                  <ChoicesTitleWrapper>
                    Choices
                    <MultivoteWrapper>
                      multivote
                      <ThemedCheckbox
                        checked={isMultivote}
                        onChange={() => {
                          setIsMultivote(!isMultivote);
                          setSelectedChoiceId(undefined);
                        }}
                        type="checkbox"
                        margin="0 4px 0 4px"
                      />
                    </MultivoteWrapper>
                  </ChoicesTitleWrapper>
                }
                minWidth="100%"
              >
                <LoadingFallback isLoading={pollDataStatus === 'loading'}>
                  {isMultivote ? (
                    <SeparatedList>
                      {poll?.choices.map((choice) => (
                        <SelectableListElement key={choice.id} isSelected={false} isMultivote>
                          <Switch
                            onChange={() => {
                              votesForChoices.set(choice.id, !votesForChoices.get(choice.id));
                              setVotesForChoices(new Map(votesForChoices));
                            }}
                            checked={votesForChoices.get(choice.id)!}
                            height={16}
                            width={32}
                          />
                          <ChoiceNameWrapper>{choice.value}</ChoiceNameWrapper>
                        </SelectableListElement>
                      ))}
                    </SeparatedList>
                  ) : (
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
                    </SeparatedList>
                  )}
                  {!poll?.isFinished && <FramedSectionButton onClick={startVoteProcedure}>VOTE</FramedSectionButton>}
                  <VoteConfirmationModal
                    ref={voteConfirmationModalRef}
                    vote={vote}
                    symbol={poll?.underlyingToken?.symbol ?? ''}
                    balance={poll?.underlyingToken?.balance ?? ''}
                    selectedChoice={poll?.choices[selectedChoiceId!]?.value}
                    pollType={poll?.pollType!}
                  />
                </LoadingFallback>
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
            <LoadingFallback isLoading={pollDataStatus === 'loading'}>
              <Box padding="32px 32px 0 0" paddingMobile="16px 0">
                <FramedSection
                  title={
                    <PropertiesWrapper>
                      Properties
                      <ChipWrapper value={poll?.isFinished ? 'Ended' : 'Active'}>
                        {poll?.isFinished ? 'Ended' : 'Active'}
                      </ChipWrapper>
                    </PropertiesWrapper>
                  }
                  minWidth="100%"
                >
                  <SeparatedList>
                    <PropertiesElement break>
                      Poll type
                      <PollTypeModal isReadOnly={true} selectedValue={poll?.pollType} />
                    </PropertiesElement>
                    {poll?.underlyingToken?.address === ethers.constants.AddressZero ? null : (
                      <>
                        <PropertiesElement break>
                          Token
                          <UnderlyingTokenModal
                            isReadOnly={true}
                            externalLink={generateAddressLink(poll?.underlyingToken?.address!, networkId!)}
                            selectedValue={poll?.underlyingToken}
                          />
                        </PropertiesElement>
                        <PropertiesElement>
                          Forge
                          <LinkToForge
                            pollAddress={address as string}
                            underlyingTokenAddress={poll?.underlyingToken?.address!}
                          />
                        </PropertiesElement>
                      </>
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
                        <option key={poll?.quorum} value={poll?.quorum}>
                          {poll?.quorum}
                        </option>
                      </BorderLessSelect>
                    </PropertiesElement>
                    <PropertiesElement>
                      Allow vote delegation
                      <ThemedCheckbox
                        disabled
                        checked={poll?.isVoteDelegationAllowed}
                        onChange={() => {}}
                        type="checkbox"
                        margin="0 4px 0 auto"
                      />
                    </PropertiesElement>
                  </SeparatedList>
                </FramedSection>
              </Box>
            </LoadingFallback>
            <LoadingFallback isLoading={pollDataStatus === 'loading'}>
              <Box padding="32px 32px 0 0" paddingMobile="16px 0">
                <FramedSection title={'Results'} minWidth="100%">
                  {poll?.isFinished ? (
                    poll?.quorumReached ? (
                      <>Quorum has been reached</>
                    ) : (
                      <>Quorum has not been reached</>
                    )
                  ) : null}
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
            </LoadingFallback>
            {poll?.callbackAddress === ethers.constants.AddressZero || !poll ? undefined : (
              <Box padding="32px 32px 0 0" paddingMobile="16px 0">
                <FramedSection title={'Callback'} minWidth="100%">
                  <CallbackBlockerWrapper>
                    {poll?.isCallbackCalled && (
                      <>
                        Callback has already been executed <AddressLink address={poll.callbackAddress} />
                      </>
                    )}
                    {poll?.quorumReached !== undefined && !poll.quorumReached && <>Quorum not reached</>}
                    {poll?.isFinished !== undefined && !poll.isFinished && <>Poll has not yet ended</>}
                  </CallbackBlockerWrapper>
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

function mapChoicesAndVotesToArray(votesForChoices: Map<number, boolean>) {
  const keys = [...votesForChoices.keys()];
  const values = keys.map((key) => (votesForChoices.get(key) ? 1 : -1));
  return [keys, values];
}

export default PollVotePage;
