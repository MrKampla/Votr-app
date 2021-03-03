import Navigation from '../../components/feed/Navigation';
import { ContentWrapper, FramedContainer } from '../../components/styled/homepage';
import { Box } from '../../components/styled/homepage/index';

export default function Vote() {
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <FramedContainer>
          <Box>empty Vote page, create your own poll or vote in existing one that You've been added to</Box>
        </FramedContainer>
      </ContentWrapper>
    </>
  );
}
