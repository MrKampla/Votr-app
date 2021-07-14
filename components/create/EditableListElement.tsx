import React from 'react';
import { SectionElementInput } from '../styled/create/Create';
import { FramedSectionElement } from './FramedSectionElement';

interface EditableListElementProps {
  element: {
    id: number;
    value: string;
  };
  placeholder: string;
  index: number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  EndAdornment: React.ReactNode | JSX.Element;
}

const EditableListElement: React.FC<EditableListElementProps> = ({ element, index, onChange, placeholder, EndAdornment }) => {
  return (
    <FramedSectionElement key={element.id} StartAdornment={index + 1} EndAdornment={EndAdornment}>
      <SectionElementInput translate={''} value={element.value} placeholder={placeholder} onChange={onChange} />
    </FramedSectionElement>
  );
};
export default EditableListElement;
