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

const validatePollCreationParams = (state: CreatePollStore, pollFactory: VotrPollFactory) => {
  if (!pollFactory) {
    toast.error('Please connect to ethereum network');
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
  if (state.voters.some((voter) => voter.value === '')) {
    toast.error('There cannot be empty voter address');
    return false;
  }
  if (!state.voters.every((voter) => ethers.utils.isAddress(voter.value))) {
    toast.error('Not all voters are valid ethereum addresses');
    return false;
  }
  return true;
};

export default function Create() {
  const [state, dispatch] = useReducer(createPollReducer, initialStateValue);
  const { pollFactory } = useContext(VotrContractsContext);
  const { account } = useContext(WalletContext);
  const pollTypes = usePollTypesContracts();
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <WrappableUnFramedContainer>
          <BoxColumn>
            <Box>
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
            <Box padding="16px 32px">
              <FramedSection title={'Choices'} minWidth="100%">
                <SeparatedList>
                  {state.choices.map((choice, index) => (
                    <EditableListElement
                      key={choice.id}
                      element={choice}
                      placeholder="choice"
                      index={index}
                      EndAdornment={<CloseIcon onClick={() => dispatch({ type: 'REMOVE_CHOICE', choice })} />}
                      onChange={(e) => dispatch({ type: 'CHANGE_CHOICE', choice: { id: choice.id, value: e.target.value } })}
                    />
                  ))}
                  <FramedSectionButton onClick={() => dispatch({ type: 'ADD_CHOICE' })}>Add choice</FramedSectionButton>
                </SeparatedList>
              </FramedSection>
            </Box>
            <Box padding="16px 32px 16px 32px">
              <FramedSection title={'Voters'} minWidth="100%">
                <SeparatedList>
                  {state.voters.map((voter, index) => (
                    <EditableListElement
                      key={voter.id}
                      element={voter}
                      placeholder="address"
                      index={index}
                      EndAdornment={<CloseIcon onClick={() => dispatch({ type: 'REMOVE_VOTER', voter })} />}
                      onChange={(e) => dispatch({ type: 'CHANGE_VOTER', voter: { id: voter.id, value: e.target.value } })}
                    />
                  ))}
                  <FramedSectionButton onClick={() => dispatch({ type: 'ADD_VOTER' })}>Add voter&apos;s address</FramedSectionButton>
                </SeparatedList>
              </FramedSection>
            </Box>
          </BoxColumn>
          <WrappableBoxColumn width="480px">
            <Box padding="32px 32px 0 0">
              <FramedSection title={'Properties'} minWidth="100%">
                <SeparatedList>
                  <PropertiesElement break>
                    Poll type
                    <BorderLessSelect
                      value={state.pollType?.name}
                      onChange={(e) =>
                        dispatch({ type: 'SET_POLL_TYPE', poll: pollTypes.find((pollType) => pollType.name === e.target.value)! })
                      }
                      margin="0 2px 0 auto"
                    >
                      {pollTypes.map((pollType) => (
                        <option key={pollType.name} value={pollType.name}>
                          {pollType.name}
                        </option>
                      ))}
                    </BorderLessSelect>
                  </PropertiesElement>
                  <PropertiesElement break>
                    End date
                    <BorderLessDatePicker
                      value={state.endDate.substring(0, 16)}
                      onChange={(e) => dispatch({ type: 'SET_END_DATE', value: new Date(e.target.value).toISOString() })}
                      type="datetime-local"
                      margin="0 0 0 auto"
                    />
                  </PropertiesElement>
                  <PropertiesElement>
                    Quorum
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
                  onClick={async () => {
                    if (!pollFactory) return;
                    if (validatePollCreationParams(state, pollFactory)) {
                      const tx = await pollFactory.createPoll(
                        pollTypes[0].address,
                        {
                          basedOnToken: ethers.constants.AddressZero,
                          name: 'vToken',
                          symbol: 'VTK',
                        },
                        {
                          title: state.title,
                          description: state.description,
                          allowVoteDelegation: true,
                          callbackContractAddress: ethers.constants.AddressZero,
                          chairman: account,
                          quorum: state.quorum,
                          endDate: Math.round(new Date(state.endDate).getTime() / 1000),
                        },
                        state.choices.map((choice) => choice.value),
                        state.voters.map((voter) => ({
                          addr: voter.value,
                          allowedVotes: 1,
                        }))
                      );
                      const receipt = await tx.wait();
                      toast.success('Successfully created a new poll!', { position: 'top-right' });
                      console.log({
                        tx,
                        receipt,
                      });
                    }
                  }}
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
