import Navigation from '../components/polls/Navigation';
import PollList from '../components/polls/PollList';
import { Title } from '../components/styled/polls/Polls';
import { ContentWrapper, UnframedContainer } from '../components/styled/homepage';
import { Box } from '../components/styled/polls/Polls';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useCreatedPollsByAccount } from '../utils/hooks/useCreatedPollsByAccount';
import { usePollsInWhichAccountVoted } from '../utils/hooks/usePollsInWhichAccountVoted';

const LoadingIndicator = () => (
  <SkeletonTheme color="#222222" highlightColor="#333333">
    <Skeleton height="48px" />
  </SkeletonTheme>
);

export default function Polls() {
  const [pollsCreatedByUser, arePollsCreatedByUserLoading] = useCreatedPollsByAccount();
  const [pollsInWitchUserVoted, arePollsInWitchUserVotedLoading] = usePollsInWhichAccountVoted();
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <UnframedContainer>
          <Box>
            <Title>Polls in which You voted</Title>
            {arePollsInWitchUserVotedLoading ? (
              <LoadingIndicator />
            ) : (
              <PollList polls={pollsInWitchUserVoted} emptyNotification="There are no polls in which this account took action" />
            )}
            <Title>Polls created by You</Title>
            {arePollsCreatedByUserLoading ? (
              <LoadingIndicator />
            ) : (
              <PollList
                polls={pollsCreatedByUser}
                emptyNotification="There are no polls created by this account. Go ahead and create one!"
              />
            )}
          </Box>
        </UnframedContainer>
      </ContentWrapper>
    </>
  );
}
