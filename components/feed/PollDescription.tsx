import React from 'react';
import { PollDescriptionRow } from '../styled/feed/Feed';
import { Poll } from './PollList';

interface PollDescriptionProps {
  poll: Poll;
}

const PollDescription: React.FC<PollDescriptionProps> = ({ poll: { address, creator, startDate, endDate } }) => {
  return (
    <PollDescriptionRow>
      at <span>{address}</span> by <span>{creator}</span>, started <span>{startDate}</span>, end <span>{endDate}</span>
    </PollDescriptionRow>
  );
};

export default PollDescription;
