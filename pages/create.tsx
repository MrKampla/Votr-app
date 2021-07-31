import { useContext, useReducer } from 'react';
import { ethers } from 'ethers';
import Navigation from '../components/polls/Navigation';
import { ContentWrapper, Box } from '../components/styled/homepage';
import {
  InputsWrapper,
  BoxColumn,
  WrappableBoxColumn,
  SeparatedList,
  BorderLessDescription,
  BorderLessInput,
  BorderLessSelect,
  BorderLessDatePicker,
  ThemedCheckbox,
  WrappableUnFramedContainer,
  QuorumInput,
} from '../components/styled/create/Create';
import { FramedSectionButton, PropertiesElement, CloseIcon } from '../components/styled/create/FramedSection';
import FramedSection from '../components/create/FramedSection';
import { VotrContractsContext } from '../components/providers/ContractInitializer';
import { WalletContext } from '../components/providers/WalletConnector';
import toast from 'react-hot-toast';
import { createPollReducer, initialStateValue, CreatePollStore } from '../components/create/createPollReducer';
import EditableListElement from '../components/create/EditableListElement';
import { usePollTypesContracts } from '../utils/hooks/usePollTypesContracts';
import { VotrPollFactory } from '../contracts/@types/VotrPollFactory';
import { PollType } from '../constants/pollTypes';
import { generateTransactionToast } from '../utils/generateTransactionToast';
import PollTypeModal from '../components/create/PollTypeModal';
import UnderlyingTokenModal from '../components/create/UnderlyingTokenModal';
import CallbackModal from '../components/create/CallbackModal';
import { VotingPowerInput } from '../components/styled/create/Create';

export default function Create() {
  const [state, dispatch] = useReducer(createPollReducer, initialStateValue);
  const { pollFactory, networkId } = useContext(VotrContractsContext);
  const { account } = useContext(WalletContext);
  const pollTypes = usePollTypesContracts();
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <WrappableUnFramedContainer>
          <BoxColumn>
            <Box paddingMobile="8px">
              <InputsWrapper>
                <BorderLessInput
                  placeholder="Title"
                  value={state.title}
                  translate=""
                  onChange={(e) => dispatch({ type: 'SET_TITLE', title: e.target.value })}
                />
                <BorderLessDescription
                  placeholder="Description of a poll"
                  value={state.description}
                  translate=""
                  onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', description: e.target.value })}
                />
              </InputsWrapper>
            </Box>
            <Box padding="16px 32px" paddingMobile="16px 0">
              <FramedSection title={'Choices'} minWidth="100%">
                <SeparatedList>
                  {state.choices.map((choice, index) => (
                    <EditableListElement
                      key={choice.id}
                      element={choice}
                      placeholder="choice"
                      StartAdornment={index}
                      EndAdornment={<CloseIcon onClick={() => dispatch({ type: 'REMOVE_CHOICE', choice })} />}
                      onChange={(e) =>
                        dispatch({ type: 'CHANGE_CHOICE', choice: { id: choice.id, value: e.target.value } })
                      }
                    />
                  ))}
                  <FramedSectionButton onClick={() => dispatch({ type: 'ADD_CHOICE' })}>Add choice</FramedSectionButton>
                </SeparatedList>
              </FramedSection>
            </Box>
            <Box padding="16px 32px 16px 32px" paddingMobile="16px 0">
              <FramedSection title={'Voters'} minWidth="100%">
                <SeparatedList>
                  {state.voters.map((voter) => (
                    <EditableListElement
                      key={voter.id}
                      element={voter}
                      placeholder="address"
                      StartAdornment={
                        <VotingPowerInput
                          id={`votingPowerInput${voter.id}`}
                          value={voter.votingPower}
                          autoComplete="no"
                          onChange={(e) => {
                            dispatch({ type: 'CHANGE_VOTING_POWER', id: voter.id, power: e.target.value });
                            const inputRef = document.getElementById(`votingPowerInput${voter.id}`);
                            inputRef!.style.width = `${e.target.value.length || 1}ch`;
                          }}
                        />
                      }
                      EndAdornment={<CloseIcon onClick={() => dispatch({ type: 'REMOVE_VOTER', voter })} />}
                      onChange={(e) =>
                        dispatch({ type: 'CHANGE_VOTER', voter: { id: voter.id, value: e.target.value } })
                      }
                    />
                  ))}
                  <FramedSectionButton onClick={() => dispatch({ type: 'ADD_VOTER' })}>
                    Add voter&apos;s address
                  </FramedSectionButton>
                </SeparatedList>
              </FramedSection>
            </Box>
          </BoxColumn>
          <WrappableBoxColumn width="480px">
            <Box padding="32px 32px 0 0" paddingMobile="16px 0">
              <FramedSection title={'Properties'} minWidth="100%">
                <SeparatedList>
                  <PropertiesElement break>
                    Poll type
                    <PollTypeModal
                      selectedValue={state.pollType}
                      onChange={(pollType) => dispatch({ type: 'SET_POLL_TYPE', poll: pollType })}
                    />
                  </PropertiesElement>
                  <PropertiesElement break>
                    Token
                    <UnderlyingTokenModal
                      selectedValue={state.underlyingToken}
                      onChange={(token) => dispatch({ type: 'SET_UNDERLYING_TOKEN', token })}
                    />
                  </PropertiesElement>
                  <PropertiesElement break>
                    Callback
                    <CallbackModal
                      selectedValue={state.callbackAddress}
                      onChange={(address) => dispatch({ type: 'SET_CALLBACK_ADDRESS', address })}
                    />
                  </PropertiesElement>
                  <PropertiesElement break>
                    End date
                    <BorderLessDatePicker
                      value={state.endDate.substring(0, 16)}
                      onChange={(e) =>
                        dispatch({ type: 'SET_END_DATE', value: new Date(e.target.value).toISOString() })
                      }
                      type="datetime-local"
                      margin="0 0 0 auto"
                    />
                  </PropertiesElement>
                  <PropertiesElement break>
                    Quorum
                    {state.voters.length === 0 ? (
                      <QuorumInput
                        value={state.quorum}
                        onChange={(e) => dispatch({ type: 'SET_QUORUM', value: +e.target.value })}
                      />
                    ) : (
                      <BorderLessSelect
                        value={state.quorum}
                        onChange={(e) => dispatch({ type: 'SET_QUORUM', value: +e.target.value })}
                        margin="0 2px 0 auto"
                      >
                        {state.voters.map((_, id) => (
                          <option key={id} value={id + 1}>
                            {id + 1}
                          </option>
                        ))}
                      </BorderLessSelect>
                    )}
                  </PropertiesElement>
                  <PropertiesElement>
                    Allow vote delegation
                    <ThemedCheckbox
                      checked={state.isVoteDelegationAllowed}
                      onChange={(e) => dispatch({ type: 'SET_VOTE_DELEGATION', value: e.target.checked })}
                      type="checkbox"
                      margin="0 4px 0 auto"
                    />
                  </PropertiesElement>
                </SeparatedList>
                <FramedSectionButton
                  onClick={() => createNewPoll(state, { account, pollTypes, pollFactory, networkId: networkId! })}
                >
                  Publish
                </FramedSectionButton>
              </FramedSection>
            </Box>
          </WrappableBoxColumn>
        </WrappableUnFramedContainer>
      </ContentWrapper>
    </>
  );
}

const validatePollCreationParams = (state: CreatePollStore, pollFactory: VotrPollFactory) => {
  if (!pollFactory) {
    toast.error('Please connect to ethereum network');
    return false;
  }
  if (!state.pollType) {
    toast.error('Choose poll type');
    return false;
  }
  if (!state.title.length) {
    toast.error('Add title to poll');
    return false;
  }
  if (!state.description.length) {
    toast.error('Add description to poll');
    return false;
  }
  if (state.choices.length < 2) {
    toast.error('Add at least two choices for users to choose from');
    return false;
  }
  if (state.voters.some((voter) => voter.value === '')) {
    toast.error('There cannot be empty voter address');
    return false;
  }
  if (!state.voters.every((voter) => ethers.utils.isAddress(voter.value))) {
    toast.error('Not all voters are valid ethereum addresses');
    return false;
  }
  if (state.voters.length === 0 && !state.underlyingToken) {
    toast.error('There are no voters specified, plese add some addresses or choose an underlying ERC20 token');
    return false;
  }
  return true;
};

const createNewPoll = async (
  state: CreatePollStore,
  {
    account,
    pollTypes,
    pollFactory,
    networkId,
  }: { account: string; pollTypes: PollType[]; pollFactory?: VotrPollFactory; networkId: number }
) => {
  if (!account || !pollFactory) {
    toast.error('Cannot create a poll without connecting to a network and choosing an account');
    return;
  }
  if (validatePollCreationParams(state, pollFactory)) {
    const tx = await pollFactory.createPoll(
      state.pollType?.address ?? pollTypes[0].address,
      {
        basedOnToken: state.underlyingToken?.address || ethers.constants.AddressZero,
        name: state.underlyingToken?.name ?? 'vToken',
        symbol: state.underlyingToken?.symbol ?? 'VTK',
      },
      {
        title: state.title,
        description: state.description,
        allowVoteDelegation: state.isVoteDelegationAllowed,
        callbackContractAddress: state.callbackAddress || ethers.constants.AddressZero,
        chairman: account,
        quorum: state.quorum,
        endDate: Math.round(new Date(state.endDate).getTime() / 1000),
      },
      state.choices.map((choice) => choice.value),
      state.voters.map((voter) => ({
        addr: voter.value,
        allowedVotes: voter.votingPower,
      }))
    );
    const receiptPromise = tx.wait();
    generateTransactionToast(receiptPromise, tx.hash, networkId);
  }
};
