import React from 'react';
import { NextPageContext } from 'next';
import Navigation from '../components/polls/Navigation';
import { ContentWrapper, UnframedContainer } from '../components/styled/homepage';
import { Slider as TabsWrapper, SliderContainer as TabsContainer } from '../components/styled/homepage/Carousel';
import { usePagination } from '../utils/hooks/usePagination';
import {
  TabsSelectorContainer,
  TabUnderline,
  TabControls as TabsSelector,
  TitleWrapper,
  LockIcon,
  ForgeHeaderContainer,
  ForgeContainer,
  TabSelector,
} from '../components/styled/forge/Forge';
import Lock from '../components/forge/Lock';
import Unlock from '../components/forge/Unlock';

const FORGE_TABS = ['Lock', 'Unlock'];

function Forge({ token, poll }: { token: string; poll: string }) {
  const [activeIdx, setActiveIdx] = usePagination(FORGE_TABS.length);
  return (
    <>
      <Navigation />
      <ContentWrapper>
        <UnframedContainer>
          <ForgeContainer>
            <ForgeHeaderContainer>
              <LockIcon />
              <TitleWrapper>
                Lock underlying tokens and mint vTokens in order to vote in polls based on ERC20 tokens
              </TitleWrapper>
            </ForgeHeaderContainer>
            <TabsSelector>
              <TabsSelectorContainer>
                {FORGE_TABS.map((name, index) => (
                  <TabSelector
                    key={name}
                    isSelected={activeIdx === index}
                    onClick={() => {
                      setActiveIdx(index);
                    }}
                  >
                    {name}
                  </TabSelector>
                ))}
              </TabsSelectorContainer>
            </TabsSelector>
            <TabUnderline activeIdx={activeIdx} amountOfTabs={FORGE_TABS.length} />
            <TabsContainer>
              <TabsWrapper activeIdx={activeIdx}>
                <Lock initialPollAddress={poll} initialTokenAddress={token} />
                <Unlock initialPollAddress={poll} initialTokenAddress={token} />
              </TabsWrapper>
            </TabsContainer>
          </ForgeContainer>
        </UnframedContainer>
      </ContentWrapper>
    </>
  );
}

Forge.getInitialProps = async (context: NextPageContext) => {
  return {
    token: context.query.token ?? '',
    poll: context.query.poll ?? '',
  };
};

export default Forge;
