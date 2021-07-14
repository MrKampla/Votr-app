import { NextRouter } from 'next/router';
import React from 'react';
import { Box, Description, DescriptionWrapper, ParagraphWrapper, Title } from '../styled/homepage';
import { CarouselItem } from '../styled/homepage/Carousel';

interface CardProps {
  title: JSX.Element;
  description: string;
  router: NextRouter;
  button: (router: NextRouter) => JSX.Element;
  Paragraph?: () => JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, description, router, button, Paragraph }) => {
  return (
    <CarouselItem>
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
  );
};
export default Card;
