import { Dispatch, SetStateAction, useState } from 'react';

interface UseStyledModalProps {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
function useStyledModal({ isOpen, setIsOpen }: UseStyledModalProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setOpacity(0);
    setIsOpen?.(!isOpen);
    setInternalIsOpen(!internalIsOpen);
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
  return { opacity, toggleModal, afterOpen, beforeClose, isOpen: internalIsOpen };
}

export default useStyledModal;
