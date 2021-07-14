import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { EmptyPollListNotification, ListElement, ListWrapper, LoadMoreButton } from '../styled/polls/Polls';
import { PollElement } from './PollElement';

export type PollStatus = 'Active' | 'Ended';

export type Poll = {
  status: PollStatus;
  title: string;
  creator: string;
  startDate: number;
  endDate: number;
  link: string;
  address: string;
};

interface PollListProps {
  polls: Poll[];
  emptyNotification: string;
}

const PollList: React.FC<PollListProps> = ({ polls, emptyNotification }) => {
  const [range, setRange] = useState(5);
  const router = useRouter();
  return (
    <>
      {polls.length ? (
        <ListWrapper>
          {polls.length
            ? polls.slice(0, range).map((poll) => (
                <ListElement key={poll.address} onClick={() => router.push(poll.link)}>
                  <PollElement element={poll} />
                </ListElement>
              ))
            : null}
        </ListWrapper>
      ) : null}
      {polls.length ? null : <EmptyPollListNotification>{emptyNotification}</EmptyPollListNotification>}
      {polls.length && range < polls.length ? <LoadMoreButton onClick={() => setRange(range + 5)}>Load More</LoadMoreButton> : null}
    </>
  );
};

export default PollList;
