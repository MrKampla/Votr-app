import { useContext } from 'react';
import Navigation from '../components/polls/Navigation';
import PollList from '../components/polls/PollList';
import { Title } from '../components/styled/polls/Polls';
import { ContentWrapper, UnframedContainer } from '../components/styled/homepage';
import { Box } from '../components/styled/polls/Polls';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useCreatedPollsByAccount } from '../utils/hooks/useCreatedPollsByAccount';
import { usePollsInWhichAccountVoted } from '../utils/hooks/usePollsInWhichAccountVoted';
import { ThemeContext } from 'styled-components';
import { darken, lighten } from 'polished';

const LoadingIndicator = () => {
  const { primary, mode } = useContext(ThemeContext);
  const modifierFunction = mode === 'dark' ? lighten : darken;
  return (
    <SkeletonTheme color={modifierFunction(0.1, primary)} highlightColor={modifierFunction(0.2, primary)}>
      <Skeleton height="48px" />
    </SkeletonTheme>
  );
};

export default function Polls() {
  const [pollsCreatedByUser, pollsCreatedByUserStatus] = useCreatedPollsByAccount();
  const [pollsInWitchUserVoted, pollsInWitchUserVotedStatus] = usePollsInWhichAccountVoted();
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <UnframedContainer>
          <Box>
            <Title>Polls in which You voted</Title>
            {pollsInWitchUserVotedStatus === 'loading' ? (
              <LoadingIndicator />
            ) : (
              <PollList
                polls={pollsInWitchUserVoted}
                emptyNotification={
                  pollsInWitchUserVotedStatus === 'error'
                    ? 'An error occured while fetching data. Try to refresh the page.'
                    : 'There are no polls in which this account took action'
                }
              />
            )}
            <Title>Polls created by You</Title>
            {pollsCreatedByUserStatus === 'loading' ? (
              <LoadingIndicator />
            ) : (
              <PollList
                polls={pollsCreatedByUser}
                emptyNotification={
                  pollsCreatedByUserStatus === 'error'
                    ? 'An error occured while fetching data. Try to refresh the page.'
                    : 'There are no polls created by this account. Go ahead and create one!'
                }
              />
            )}
          </Box>
        </UnframedContainer>
      </ContentWrapper>
    </>
  );
}
