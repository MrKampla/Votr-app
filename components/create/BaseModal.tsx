import React, { Dispatch, SetStateAction } from 'react';
import useStyledModal from '../../utils/hooks/useStyledModal';
import {
  ExternalLinkIcon,
  ModalOpenerWrapper,
  OpenModalIcon,
  StyledModal,
  ExternalLink,
} from '../styled/create/VotrModalStyled';

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedValue?: React.ReactNode;
  margin?: string;
  isReadOnly?: boolean;
  externalLink?: string;
}

export type ModalProps<T> = {
  selectedValue?: T;
  isReadOnly?: boolean;
  onChange?: (pollType: T) => void;
  externalLink?: string;
};

const BaseModal: React.FC<BaseModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  selectedValue,
  margin,
  isReadOnly,
  externalLink,
}) => {
  const { opacity, afterOpen, beforeClose, toggleModal } = useStyledModal({ isOpen, setIsOpen });

  return (
    <ModalOpenerWrapper margin={margin}>
      {selectedValue}
      {!isReadOnly && <OpenModalIcon onClick={toggleModal} />}
      {externalLink && (
        <ExternalLink href={externalLink} target="_blank" rel="noreferrer">
          <ExternalLinkIcon />
        </ExternalLink>
      )}
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
