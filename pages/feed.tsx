import { useContext, useEffect, useState } from 'react';
import Navigation from '../components/feed/Navigation';
import PollList, { Poll } from '../components/feed/PollList';
import { Title } from '../components/styled/feed/Feed';
import { ContentWrapper, FramedContainer } from '../components/styled/homepage';
import { Box } from '../components/styled/feed/Feed';
import { VotrContractsContext } from '../components/ContractInitializer';
import { WalletContext } from '../components/header/WalletConnector';

export default function Feed() {
  const { pollFactory } = useContext(VotrContractsContext);
  const { account } = useContext(WalletContext);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    pollFactory?.getPastEvents('PollCreated', { filter: { owner: account } }).then((res) => {
      console.log(res);
      // setPolls(res.map(poll => {
      //   poll.returnValues.
      // }));
    });
  }, [pollFactory, account]);

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <FramedContainer>
          <Box>
            <Title>Your latest polls</Title>
            <PollList polls={polls} emptyNotification="There are no polls connected with this account" />
            <Title>Polls You have created</Title>
            <PollList polls={[]} emptyNotification="There are no polls created by this account" />
          </Box>
        </FramedContainer>
      </ContentWrapper>
    </>
  );
}
