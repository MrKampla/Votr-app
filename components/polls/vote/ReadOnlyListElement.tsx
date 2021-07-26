import React from 'react';
import { ReactNode } from 'react';
import { MainContentWrapper } from '../../styled/create/VotrModalStyled';
import { ReadOnlyListElementContainer, IndexWrapper, EndAdornmentWrapper } from '../../styled/polls/vote/Vote';

interface ReadOnlyListElementProps {
  StartAdornment: ReactNode | JSX.Element;
  id: number;
  value: string;
  EndAdornment: ReactNode | JSX.Element;
}

const ReadOnlyListElement = ({ id, value, StartAdornment, EndAdornment }: ReadOnlyListElementProps) => {
  return (
    <ReadOnlyListElementContainer key={id}>
      <IndexWrapper>{StartAdornment}</IndexWrapper>
      <MainContentWrapper>{value}</MainContentWrapper>
      <EndAdornmentWrapper>{EndAdornment}</EndAdornmentWrapper>
    </ReadOnlyListElementContainer>
  );
};

export default ReadOnlyListElement;
