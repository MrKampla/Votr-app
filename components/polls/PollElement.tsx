import React from 'react';
import { Poll } from './PollList';
import { ElementRow, PollTitle } from '../styled/polls/Polls';
import { ChipWrapper as StatusChip } from '../styled/polls/Polls';
import PollDescription from './PollDescription';

interface PollElementProps {
  element: Poll;
}

export const PollElement: React.FC<PollElementProps> = ({ element }) => {
  return (
    <>
      <ElementRow>
        <StatusChip value={element.status}>{element.status}</StatusChip>
        <PollTitle>{element.title}</PollTitle>
      </ElementRow>
      <ElementRow>
        <PollDescription poll={element} />
      </ElementRow>
    </>
  );
};
