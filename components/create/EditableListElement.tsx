import React, { ReactNode } from 'react';
import { SectionElementInput } from '../styled/create/Create';
import { FramedSectionElement } from './FramedSectionElement';

interface EditableListElementProps {
  element: {
    id: number;
    value: string;
  };
  placeholder: string;
  index?: ReactNode | JSX.Element;
  isError?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  EndAdornment?: React.ReactNode | JSX.Element;
}

const EditableListElement: React.FC<EditableListElementProps> = ({ element, index, onChange, placeholder, isError, EndAdornment }) => {
  const startAdornment = createStartAdornment(index);
  return (
    <FramedSectionElement key={element.id} isError={isError} StartAdornment={startAdornment} EndAdornment={EndAdornment}>
      <SectionElementInput autoComplete="no" translate={''} value={element.value} placeholder={placeholder} onChange={onChange} />
    </FramedSectionElement>
  );
};
export default EditableListElement;

function createStartAdornment(index: ReactNode | JSX.Element) {
  if (typeof index === 'string') {
    return <>{index}</>;
  }
  if (typeof index === 'number') {
    return <>{index + 1}</>;
  }
  return index;
}
