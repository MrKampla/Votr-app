import React, { ReactNode } from 'react';
import { FramedElementWrapper, FramedSectionContent } from '../styled/create/Create';
import { ElementKey } from '../styled/create/FramedSection';

interface FramedSectionElementProps {
  StartAdornment?: JSX.Element | ReactNode;
  EndAdornment?: JSX.Element | ReactNode;
  isError?: boolean;
}

export const FramedSectionElement: React.FC<FramedSectionElementProps> = ({
  StartAdornment,
  EndAdornment,
  isError,
  children,
}) => {
  return (
    <FramedElementWrapper isError={isError}>
      <ElementKey>{StartAdornment}</ElementKey>
      <FramedSectionContent>{children}</FramedSectionContent>
      {EndAdornment}
    </FramedElementWrapper>
  );
};
