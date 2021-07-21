import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { ModalOpenerWrapper, OpenModalIcon, StyledModal } from '../styled/create/VotrModalStyled';
interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedValue?: React.ReactNode;
  margin?: string;
}
const BaseModal: React.FC<BaseModalProps> = ({ children, isOpen, setIsOpen, selectedValue, margin }) => {
  const [opacity, setOpacity] = useState(0);
  function toggleModal() {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  return (
    <ModalOpenerWrapper margin={margin}>
      {selectedValue}
      <OpenModalIcon onClick={toggleModal} />
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        backgroundProps={{ opacity }}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
      >
        {children}
      </StyledModal>
    </ModalOpenerWrapper>
  );
};
export default BaseModal;
