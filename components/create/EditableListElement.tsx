import React, { ReactNode } from 'react';
import { SectionElementInput } from '../styled/create/Create';
import { FramedSectionElement } from './FramedSectionElement';

interface EditableListElementProps {
  element: {
    id: number;
    value: string;
  };
  placeholder: string;
  StartAdornment?: ReactNode | JSX.Element;
  isError?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  EndAdornment?: React.ReactNode | JSX.Element;
}

const EditableListElement: React.FC<EditableListElementProps> = ({
  element,
  StartAdornment,
  onChange,
  placeholder,
  isError,
  EndAdornment,
}) => {
  return (
    <FramedSectionElement
      key={element.id}
      isError={isError}
      StartAdornment={StartAdornment}
      EndAdornment={EndAdornment}
    >
      <SectionElementInput
        autoComplete="no"
        translate={''}
        value={element.value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FramedSectionElement>
  );
};
export default EditableListElement;
