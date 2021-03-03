import React from 'react';
import { Poll } from './PollList';
import { ElementRow, PollTitle } from '../styled/feed/Feed';
import { ChipWrapper as StatusChip } from '../styled/feed/Feed';
import PollDescription from './PollDescription';

interface PollElementProps {
  element: Poll;
}

export const PollElement: React.FC<PollElementProps> = ({ element }) => {
  return (
    <>
      <ElementRow>
        <StatusChip value={element.status} />
        <PollTitle>{element.title}</PollTitle>
      </ElementRow>
      <ElementRow>
        <PollDescription poll={element} />
      </ElementRow>
    </>
  );
};
