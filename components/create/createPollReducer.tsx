import { PollType } from '../../constants/pollTypes';
import { ERC20Token } from './UnderlyingTokenModal';

export const initialStateValue = {
  voters: [
    { id: 0, value: '', votingPower: '1' },
    { id: 1, value: '', votingPower: '1' },
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
  | { type: 'CHANGE_VOTING_POWER'; id: number; power: string }
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
      if (isNaN(+action.value) || action.value > 1_000_000_000) {
        return { ...stateCopy };
      }
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
      const newVoterId = stateCopy.voters.length === 0 ? 0 : Math.max(...state.voters.map((x) => x.id)) + 1;
      stateCopy.voters.push({ id: newVoterId, value: '', votingPower: '1' });
      return { ...stateCopy };
    case 'CHANGE_VOTING_POWER':
      if (isNaN(+action.power) || action.power.length > 16) {
        return { ...stateCopy };
      }
      const voterToChangePower = stateCopy.voters.find((voter) => voter.id === action.id)!;
      voterToChangePower.votingPower = action.power;
      return { ...stateCopy };
    case 'CHANGE_VOTER':
      const voter = stateCopy.voters.find((voter) => voter.id === action.voter.id)!;
      voter.value = action.voter.value;
      return { ...stateCopy };
    case 'REMOVE_VOTER':
      stateCopy.voters = stateCopy.voters.filter((voter) => voter !== action.voter);
      if (stateCopy.voters.length < stateCopy.quorum) {
        stateCopy.quorum = stateCopy.voters.length;
      }
      return { ...stateCopy };
    default:
      return state;
  }
}
