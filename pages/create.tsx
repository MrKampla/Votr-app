import { useReducer } from 'react';
import Navigation from '../components/feed/Navigation';
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
} from '../components/styled/create/Create';
import { FramedSectionButton, PropertiesElement, CloseIcon } from '../components/styled/create/FramedSection';
import FramedSection from '../components/create/FramedSection';
import { FramedSectionElement } from '../components/create/FramedSectionElement';

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
};

type CreatePollStore = typeof initialStateValue;

interface ListElement {
  id: number;
  value: string;
}

type Action =
  | { type: 'SET_DESCRIPTION'; description: string }
  | { type: 'SET_TITLE'; title: string }
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
    case 'ADD_CHOICE':
      const newId = stateCopy.choices.length === 0 ? 0 : Math.max(...state.choices.map((x) => x.id)) + 1;
      stateCopy.choices.push({ id: newId, value: '' });
      return { ...stateCopy };
    case 'CHANGE_CHOICE':
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
                  <PropertiesElement>
                    Poll type
                    <BorderLessSelect margin="0 0 0 auto">
                      <option>First Past The Post</option>
                      <option>Cumulative</option>
                      <option>Evaluative</option>
                      <option>Quadratic</option>
                    </BorderLessSelect>
                  </PropertiesElement>
                  <PropertiesElement>
                    Start date <BorderLessDatePicker type="date" margin="0 0 0 auto" />
                  </PropertiesElement>
                  <PropertiesElement>
                    End date <BorderLessDatePicker type="date" margin="0 0 0 auto" />
                  </PropertiesElement>
                  <PropertiesElement>
                    Quorum
                    <BorderLessSelect margin="0 0 0 auto">
                      {state.voters.map((_, id) => (
                        <option>{id + 1}</option>
                      ))}
                    </BorderLessSelect>
                  </PropertiesElement>
                  <PropertiesElement>
                    Allow vote delegation <input type="checkbox" style={{ marginLeft: 'auto' }} />
                  </PropertiesElement>
                </SeparatedList>
                <FramedSectionButton>Publish</FramedSectionButton>
              </FramedSection>
            </Box>
          </WrappableBoxColumn>
        </WrappableFramedContainer>
      </ContentWrapper>
    </>
  );
}
