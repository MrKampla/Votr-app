import React from 'react';
import { FramedContent, FramedSectionContentWrapper, FramedTitle } from '../styled/create/Create';

interface FramedSectionProps {
  title: JSX.Element | React.ReactNode;
  minWidth?: string;
}

const FramedSection: React.FC<FramedSectionProps> = ({ title, children, minWidth }) => {
  return (
    <FramedSectionContentWrapper minWidth={minWidth}>
      <FramedTitle>{title}</FramedTitle>
      <FramedContent>{children}</FramedContent>
    </FramedSectionContentWrapper>
  );
};
export default FramedSection;
