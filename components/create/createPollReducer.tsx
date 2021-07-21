import { PollType } from '../../constants/pollTypes';
import { ERC20Token } from './UnderlyingTokenModal';

export const initialStateValue = {
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
  pollType: undefined as PollType | undefined,
  underlyingToken: undefined as ERC20Token | undefined,
  callbackAddress: '',
  endDate: new Date().toISOString(),
};
export type CreatePollStore = typeof initialStateValue;

interface ListElement {
  id: number;
  value: string;
}

export type CreatePollReducerAction =
  | { type: 'SET_DESCRIPTION'; description: string }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_POLL_TYPE'; poll: PollType }
  | { type: 'SET_UNDERLYING_TOKEN'; token: ERC20Token }
  | { type: 'SET_CALLBACK_ADDRESS'; address: string }
  | { type: 'SET_QUORUM'; value: number }
  | { type: 'SET_VOTE_DELEGATION'; value: boolean }
  | { type: 'SET_END_DATE'; value: string }
  | { type: 'ADD_VOTER' }
  | { type: 'CHANGE_VOTER'; voter: ListElement }
  | { type: 'REMOVE_VOTER'; voter: ListElement }
  | { type: 'ADD_CHOICE' }
  | { type: 'CHANGE_CHOICE'; choice: ListElement }
  | { type: 'REMOVE_CHOICE'; choice: ListElement };

export function createPollReducer(state: CreatePollStore, action: CreatePollReducerAction) {
  const stateCopy = { ...state };
  switch (action.type) {
    case 'SET_TITLE':
      return { ...stateCopy, title: action.title };
    case 'SET_DESCRIPTION':
      return { ...stateCopy, description: action.description };
    case 'SET_POLL_TYPE':
      return { ...stateCopy, pollType: action.poll };
    case 'SET_UNDERLYING_TOKEN':
      return { ...stateCopy, underlyingToken: action.token };
    case 'SET_CALLBACK_ADDRESS':
      return { ...stateCopy, callbackAddress: action.address };
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
      // gas optimisation - limit choice to only 32 characters
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
