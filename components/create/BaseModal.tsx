import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import useStyledModal from '../../utils/hooks/useStyledModal';
import { ModalOpenerWrapper, OpenModalIcon, StyledModal } from '../styled/create/VotrModalStyled';

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedValue?: React.ReactNode;
  margin?: string;
  isReadOnly?: boolean;
}

export type ModalProps<T> = { selectedValue?: T; isReadOnly?: boolean; onChange?: (pollType: T) => void };

const BaseModal: React.FC<BaseModalProps> = ({ children, isOpen, setIsOpen, selectedValue, margin, isReadOnly }) => {
  const { opacity, afterOpen, beforeClose, toggleModal } = useStyledModal({ isOpen, setIsOpen });

  return (
    <ModalOpenerWrapper margin={margin}>
      {selectedValue}
      {!isReadOnly && <OpenModalIcon onClick={toggleModal} />}
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
