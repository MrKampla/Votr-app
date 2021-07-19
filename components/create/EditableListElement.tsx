import React from 'react';
import { SectionElementInput } from '../styled/create/Create';
import { FramedSectionElement } from './FramedSectionElement';

interface EditableListElementProps {
  element: {
    id: number;
    value: string;
  };
  placeholder: string;
  index?: number;
  isError?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  EndAdornment?: React.ReactNode | JSX.Element;
}

const EditableListElement: React.FC<EditableListElementProps> = ({ element, index, onChange, placeholder, isError, EndAdornment }) => {
  return (
    <FramedSectionElement
      key={element.id}
      isError={isError}
      StartAdornment={index === undefined ? undefined : index + 1}
      EndAdornment={EndAdornment}
    >
      <SectionElementInput autoComplete="no" translate={''} value={element.value} placeholder={placeholder} onChange={onChange} />
    </FramedSectionElement>
  );
};
export default EditableListElement;
