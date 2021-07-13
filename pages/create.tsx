import { useContext, useReducer } from 'react';
import Navigation from '../components/polls/Navigation';
import { ContentWrapper, Box } from '../components/styled/homepage';
import {
  InputsWrapper,
  BoxColumn,
  WrappableFramedContainer,
  WrappableBoxColumn,
  SectionElementInput,
  SeparatedList,
  BorderLessDescription,
  BorderLessInput,
  BorderLessSelect,
  BorderLessDatePicker,
  ThemedCheckbox,
} from '../components/styled/create/Create';
import { FramedSectionButton, PropertiesElement, CloseIcon } from '../components/styled/create/FramedSection';
import FramedSection from '../components/create/FramedSection';
import { FramedSectionElement } from '../components/create/FramedSectionElement';
import { VotrContractsContext } from '../components/providers/ContractInitializer';
import { WalletContext } from '../components/providers/WalletConnector';
import toast from 'react-hot-toast';

enum Poll {
  FirstPastThePost,
  Cumulative,
  Evaluative,
  Quadratic,
}

const initialStateValue = {
  voters: [
    { id: 0, value: '' },
    { id: 1, value: '' },
  ],
  choices: [
    { id: 0, value: '' },
    { id: 1, value: '' },
  ],
  title: '',
  description: '',
  quorum: 2,
  isVoteDelegationAllowed: false,
  pollType: Poll.FirstPastThePost,
  endDate: new Date().toISOString(),
};

type CreatePollStore = typeof initialStateValue;

interface ListElement {
  id: number;
  value: string;
}

type Action =
  | { type: 'SET_DESCRIPTION'; description: string }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_POLL_TYPE'; poll: Poll }
  | { type: 'SET_QUORUM'; value: number }
  | { type: 'SET_VOTE_DELEGATION'; value: boolean }
  | { type: 'SET_END_DATE'; value: string }
  | { type: 'ADD_VOTER' }
  | { type: 'CHANGE_VOTER'; voter: ListElement }
  | { type: 'REMOVE_VOTER'; voter: ListElement }
  | { type: 'ADD_CHOICE' }
  | { type: 'CHANGE_CHOICE'; choice: ListElement }
  | { type: 'REMOVE_CHOICE'; choice: ListElement };

function createPollReducer(state: CreatePollStore, action: Action) {
  const stateCopy = { ...state };
  switch (action.type) {
    case 'SET_TITLE':
      return { ...stateCopy, title: action.title };
    case 'SET_DESCRIPTION':
      return { ...stateCopy, description: action.description };
    case 'SET_POLL_TYPE':
      return { ...stateCopy, pollType: action.poll };
    case 'SET_QUORUM':
      return { ...stateCopy, quorum: action.value };
    case 'SET_VOTE_DELEGATION':
      return { ...stateCopy, isVoteDelegationAllowed: action.value };
    case 'SET_END_DATE':
      return { ...stateCopy, endDate: action.value };
    case 'ADD_CHOICE':
      const newId = stateCopy.choices.length === 0 ? 0 : Math.max(...state.choices.map((x) => x.id)) + 1;
      stateCopy.choices.push({ id: newId, value: '' });
      return { ...stateCopy };
    case 'CHANGE_CHOICE':
      if (action.choice.value.length > 32) return state;
      const choice = stateCopy.choices.find((choice) => choice.id === action.choice.id)!;
      choice.value = action.choice.value;
      return { ...stateCopy };
    case 'REMOVE_CHOICE':
      stateCopy.choices = stateCopy.choices.filter((choice) => choice.id !== action.choice.id);
      return { ...stateCopy };
    case 'ADD_VOTER':
      stateCopy.voters.push({ id: Math.max(...state.voters.map((x) => x.id)) + 1, value: '' });
      return { ...stateCopy };
    case 'CHANGE_VOTER':
      const voter = stateCopy.voters.find((voter) => voter.id === action.voter.id)!;
      voter.value = action.voter.value;
      return { ...stateCopy };
    case 'REMOVE_VOTER':
      stateCopy.voters = stateCopy.voters.filter((voter) => voter !== action.voter);
      return { ...stateCopy };
    default:
      return state;
  }
}

export default function Create() {
  const [state, dispatch] = useReducer(createPollReducer, initialStateValue);
  const { pollFactory } = useContext(VotrContractsContext);
  const { ethereum, account } = useContext(WalletContext);

  const pollTypes = Object.keys(Poll).filter((x) => !(parseInt(x) >= 0));

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <WrappableFramedContainer>
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
                    <FramedSectionElement
                      key={choice.id}
                      StartAdornment={index + 1}
                      EndAdornment={<CloseIcon onClick={() => dispatch({ type: 'REMOVE_CHOICE', choice })} />}
                    >
                      <SectionElementInput
                        translate={''}
                        value={choice.value}
                        placeholder="choice"
                        onChange={(e) => dispatch({ type: 'CHANGE_CHOICE', choice: { id: choice.id, value: e.target.value } })}
                      />
                    </FramedSectionElement>
                  ))}
                  <FramedSectionButton onClick={() => dispatch({ type: 'ADD_CHOICE' })}>Add choice</FramedSectionButton>
                </SeparatedList>
              </FramedSection>
            </Box>
            <Box padding="16px 32px 16px 32px">
              <FramedSection title={'Voters'} minWidth="100%">
                <SeparatedList>
                  {state.voters.map((voter, index) => (
                    <FramedSectionElement
                      key={voter.id}
                      StartAdornment={index + 1}
                      EndAdornment={<CloseIcon onClick={() => dispatch({ type: 'REMOVE_VOTER', voter })} />}
                    >
                      <SectionElementInput
                        translate={''}
                        value={voter.value}
                        placeholder="address"
                        onChange={(e) => dispatch({ type: 'CHANGE_VOTER', voter: { id: voter.id, value: e.target.value } })}
                      />
                    </FramedSectionElement>
                  ))}
                  <FramedSectionButton onClick={() => dispatch({ type: 'ADD_VOTER' })}>Add voter's address</FramedSectionButton>
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
                      value={Poll[state.pollType]}
                      onChange={(e) => dispatch({ type: 'SET_POLL_TYPE', poll: Poll[e.target.value as keyof typeof Poll] })}
                      margin="0 2px 0 auto"
                    >
                      {pollTypes.map((pollType) => (
                        <option key={pollType} value={pollType}>
                          {pollType}
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
                  onClick={() => {
                    if (!pollFactory) {
                      toast.error('Please connect to ethereum network');
                      return;
                    }
                    if (!state.title.length) {
                      toast.error('Add title to poll');
                      return;
                    }
                    if (!state.description.length) {
                      toast.error('Add description to poll');
                      return;
                    }
                    if (state.voters.some((voter) => voter.value === '')) {
                      toast.error('There cannot be empty voter address');
                      return;
                    }
                    if (!state.voters.every((voter) => ethereum.utils.isAddress(voter.value))) {
                      toast.error('Not all voters are valid ethereum addresses');
                      return;
                    }
                    pollFactory.methods
                      .createPoll(
                        state.pollType,
                        state.title,
                        state.description,
                        state.choices.map((x) => ethereum.utils.fromAscii(x.value)),
                        state.voters.map((x) => x.value),
                        [],
                        state.quorum,
                        +new Date(state.endDate),
                        state.isVoteDelegationAllowed
                      )
                      .send({ from: account });
                  }}
                >
                  Publish
                </FramedSectionButton>
              </FramedSection>
            </Box>
          </WrappableBoxColumn>
        </WrappableFramedContainer>
      </ContentWrapper>
    </>
  );
}
