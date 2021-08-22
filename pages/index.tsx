import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Carousel,
  Slider,
  SliderContainer,
  StepIcon,
  StepIcons,
  Controls,
  SliderButton,
} from '../components/styled/homepage/Carousel';
import { ContentWrapper, FramedContainer } from '../components/styled/homepage';
import { CARDS } from '../components/homepage/Cards';
import { usePagination } from '../utils/hooks/usePagination';
import Card from '../components/homepage/Card';

export default function HomePage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx, previous, next] = usePagination(CARDS.length);

  return (
    <ContentWrapper>
      <Head>
        <title>Votr - decentralised voting platform</title>
      </Head>
      <FramedContainer>
        <Carousel>
          <SliderContainer>
            <Slider activeIdx={activeIdx}>
              {CARDS.map((cardProps) => (
                <Card {...cardProps} key={cardProps.key} router={router} />
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
