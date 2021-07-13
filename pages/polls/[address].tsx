import { useRouter } from 'next/router';
import React from 'react';

interface PollVotePageProps {}

const PollVotePage: React.FC<PollVotePageProps> = () => {
  const router = useRouter();
  const { address } = router.query;
  return <>{address}</>;
};

export default PollVotePage;
