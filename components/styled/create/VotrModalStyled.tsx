import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import Modal, { BaseModalBackground } from 'styled-react-modal';

export const StyledModal = Modal.styled`
  opacity: ${(props: { opacity: number }) => props.opacity};
  background-color: ${(props: any) => props.theme.primary};
  width: 50vw;
  max-width: 420px;
  min-width: 280px;
  max-height: 80vh;
  min-height: 70vh;
  border-radius: 24px;
  border: 1px solid ${(props: any) => (props.theme.mode === 'light' ? 'rgba(37, 39, 45, 0.16)' : 'rgba(249, 250, 251, 0.16)')};
  transition: opacity 0.3s ease-in-out;
  overflow-y: auto;
`;

export const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s ease-in-out;
`;

export const ModalOpenerWrapper = styled.div`
  border: 1px solid ${(props) => (props.theme.mode === 'light' ? 'rgba(37, 39, 45, 0.16)' : 'rgba(249, 250, 251, 0.16)')};
  border-radius: 8px;
  color: ${(props) => props.theme.font};
  background: ${(props) => props.theme.disabled};
  padding: 8px;
  margin-left: 8px;
  transition: 0.25s;
  font-size: 12px;
  display: flex;
  width: -webkit-fill-available;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-left: 0;
  }
`;

export const OpenModalIcon = styled(GiHamburgerMenu)`
  cursor: pointer;
  margin-left: auto;
`;

export const CloseModalIcon = styled(IoClose)`
  cursor: pointer;
  margin-left: auto;
  width: 24px;
  height: 24px;
`;

export const TitleContentWrapper = styled.div`
  color: ${(props) => props.theme.font};
  font-weight: bold;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
`;

export const AddressInputWrapper = styled.div`
  padding: 0 16px 16px 16px;
  border-bottom: 2px solid ${(props) => (props.theme.mode === 'light' ? 'rgba(37, 39, 45, 0.16)' : 'rgba(249, 250, 251, 0.16)')};
`;

export const LoaderWrapper = styled.div`
  padding: 72px 48px 32px 48px;
`;

export const ElementsList = styled.div`
  padding: 0 16px 16px 16px;
  div {
  }
`;

export const ElementCard = styled.div`
  border: 1px solid ${({ theme }) => theme.font};
  border-radius: 8px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.disabled};
  }
`;

export const ElementTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.cta};
`;

export const ElementDescription = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.font};
`;
