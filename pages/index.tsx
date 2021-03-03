import React, { useCallback, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import {
  Carousel,
  CarouselItem,
  Slider,
  SliderContainer,
  StepIcon,
  StepIcons,
  Controls,
  SliderButton,
} from '../components/styled/homepage/Carousel';
import Link from 'next/link';
import {
  ActionButton,
  Box,
  ContentWrapper,
  Description,
  DescriptionWrapper,
  DisabledButton,
  FramedContainer,
  ParagraphWrapper,
  Title,
  YellowText,
} from '../components/styled/homepage';
import PollsParagraph from '../components/homepage/PollsParagraph';

const CARDS: {
  key: string;
  title: JSX.Element;
  description: string;
  Paragraph?: () => JSX.Element;
  button: (router: NextRouter) => JSX.Element;
}[] = [
  {
    key: 'start',
    title: (
      <>
        <YellowText>Votr</YellowText> is a ready-made solution for <YellowText>on-chain democracy</YellowText> that can be{' '}
        <YellowText>easly integrated </YellowText>into every environment
      </>
    ),
    Paragraph: PollsParagraph,
    description: ' In need of truly decentralized governance? Create a poll and invite stakeholders to make a decision together.',
    button: (router) => <ActionButton onClick={() => router.push('/feed')}>Go to app</ActionButton>,
  },
  {
    key: 'contribute',
    title: (
      <>
        This protocol will definetly fit <YellowText>Your needs</YellowText> but just in case You are{' '}
        <YellowText>free to contribute</YellowText>
      </>
    ),
    description:
      'We listen to the voice of community but we also like working implementations. Anyone can create Their own poll type and deploy it to the Votr protocol for others to use.',
    button: () => (
      <Link passHref href={'http://www.github.com/mrkampla'}>
        <ActionButton>Contribute</ActionButton>
      </Link>
    ),
  },
  {
    key: 'programmable',
    title: (
      <>
        First <YellowText>fully programmable </YellowText>governance protocol
      </>
    ),
    description:
      "Sometimes people don't live up to their end of the bargain. But code does. Stop relaying on someone’s given word and just write it to the blockchain. You can specify functions that will be called depending on the outcome of the poll.",
    button: () => <DisabledButton>Not yet ready</DisabledButton>,
  },
  {
    key: 'quadratic',
    title: (
      <>
        Use the power of <YellowText>Quadratic Funding</YellowText>
      </>
    ),
    description:
      'Receive a grant for the development of Your project or express Your support for any other idea by donation. Thanks to the quadratic funding algorithm, the most liked project will receive the biggest portion of all funds raised.',
    button: () => <DisabledButton>Not yet ready</DisabledButton>,
  },
  {
    key: 'public-polls',
    title: (
      <>
        Votr also supports <YellowText>public polls &amp; proposals</YellowText>
      </>
    ),
    description:
      'If the target of Your poll is a broader audience, Votr will help You with creation of a token and distributing it at Your discretion. Votr also supports voting with existing ERC-20 tokens.',
    button: () => <DisabledButton>Not yet ready</DisabledButton>,
  },
  {
    key: 'govern',
    title: (
      <>
        Govern the <YellowText>Votr protocol</YellowText>
      </>
    ),
    description: 'Do You have any enhancement proposals? Just inform the community about that idea, and together we will figure it out.',
    button: () => <DisabledButton>Not yet ready</DisabledButton>,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const next = useCallback(() => {
    if (activeIdx < CARDS.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  }, [setActiveIdx, activeIdx]);

  const previous = useCallback(() => {
    if (activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  }, [setActiveIdx, activeIdx]);

  return (
    <ContentWrapper>
      <FramedContainer>
        <Carousel>
          <SliderContainer>
            <Slider activeIdx={activeIdx}>
              {CARDS.map(({ title, description, button, Paragraph, key }) => (
                <CarouselItem key={key}>
                  <Box>
                    <Title>{title}</Title>
                    <DescriptionWrapper>
                      <Description>{description}</Description>
                      {button(router)}
                    </DescriptionWrapper>
                  </Box>
                  <Box>
                    {Paragraph && (
                      <ParagraphWrapper>
                        <Paragraph />
                      </ParagraphWrapper>
                    )}
                  </Box>
                </CarouselItem>
              ))}
            </Slider>
          </SliderContainer>
          <Controls>
            <SliderButton onClick={previous} type="button" disabled={activeIdx === 0}>
              &lt;
            </SliderButton>
            <StepIcons>
              {CARDS.map(({ key }, index) => (
                <StepIcon
                  key={key}
                  active={activeIdx === index}
                  onClick={() => {
                    setActiveIdx(index);
                  }}
                />
              ))}
            </StepIcons>
            <SliderButton onClick={next} type="button" disabled={activeIdx === CARDS.length - 1}>
              &gt;
            </SliderButton>
          </Controls>
        </Carousel>
      </FramedContainer>
    </ContentWrapper>
  );
}
