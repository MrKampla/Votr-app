import React from 'react';
import { PollDescriptionRow } from '../styled/polls/Polls';
import { Poll } from './PollList';
import { format } from 'date-fns';
interface PollDescriptionProps {
  poll: Poll;
}

const PollDescription: React.FC<PollDescriptionProps> = ({ poll: { address, creator, startDate, endDate } }) => {
  return (
    <PollDescriptionRow>
      <div>
        at <span>{address}</span>
      </div>{' '}
      <div>
        by <span>{creator}</span>,
      </div>
      <div>
        started <span>{format(startDate, 'MM/dd/yyyy')}</span>,
      </div>
      <div>
        end <span>{format(endDate, 'MM/dd/yyyy')}</span>
      </div>
    </PollDescriptionRow>
  );
};

export default PollDescription;
