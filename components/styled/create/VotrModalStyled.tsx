import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';
import { CgClose } from 'react-icons/cg';
import styled from 'styled-components';
import Modal, { BaseModalBackground } from 'styled-react-modal';
import Image from 'next/image';
import { ButtonBase } from '../homepage';
import { darken } from 'polished';

const StyledModalBase = Modal.styled`
  opacity: ${(props: { opacity: number }) => props.opacity};
  background-color: ${(props: any) => props.theme.primary};
  width: 80vw;
  max-width: 420px;
  min-width: 280px;
  border-radius: 24px;
  border: 1px solid ${(props: any) => props.theme.border};
  transition: opacity 0.3s ease-in-out;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledModal = styled(StyledModalBase)<{ fitContent?: boolean }>`
  max-height: ${(props) => (props.fitContent ? 'fit-content' : '80vh')};
  min-height: ${(props) => (props.fitContent ? 'fit-content' : '70vh')};
`;

export const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity 0.3s ease-in-out;
`;

export const ModalOpenerWrapper = styled.div<{ margin?: string }>`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  color: ${(props) => props.theme.font};
  background: ${(props) => props.theme.disabled};
  padding: 8px;
  margin: ${(props) => props.margin ?? '0 0 0 8px'};
  transition: 0.25s;
  font-size: 12px;
  display: flex;
  width: -webkit-fill-available;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin: 0;
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
  border-bottom: 2px solid ${(props) => props.theme.border};
`;

export const LoaderWrapper = styled.div`
  padding: 72px 48px 32px 48px;
`;

export const ElementsList = styled.div`
  padding: 0 16px 16px 16px;
  color: ${(props) => props.theme.font};
`;

export const ElementCard = styled.div<{ isSelected?: boolean; nonClickable?: boolean }>`
  border: 1px solid ${({ theme, isSelected }) => (isSelected ? theme.cta : theme.border)};
  border-radius: 8px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 16px;
  cursor: ${(props) => (props.nonClickable ? 'initial' : 'pointer')};
  transition: 0.25s;
  &:hover {
    background-color: ${(props) => (props.nonClickable ? 'initial' : props.theme.disabled)};
  }
`;

export const ElementTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.cta};
`;

export const ElementDescription = styled.div<{ color?: string }>`
  font-size: 14px;
  color: ${(props) => props.color ?? props.theme.font};
`;

export const ElementLogo = styled(Image)`
  margin-left: auto;
`;

export const TokenCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`;

export const TokenDetailsContainer = styled.div`
  text-align: left;
`;

export const TokenLogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const TickLogo = styled(TiTick)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.success};
`;

export const ErrorLogo = styled(CgClose)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.danger};
`;

export const TextCenterContainer = styled.div`
  text-align: center;
`;

export const ClearCallbackButton = styled(ButtonBase)`
  color: ${(props) => (props.theme.mode === 'light' ? props.theme.primary : props.theme.font)};
  background-color: ${(props) => props.theme.danger};
  margin: 8px;
  &:hover {
    background-color: ${(props) => darken(0.1, props.theme.danger)};
  }
`;

export const MainContentWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

export const FooterWrapper = styled.div`
  border-top: 2px solid ${(props) => props.theme.border};
  display: flex;
  justify-content: center;
`;

export const SingleDescriptor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ElementValue = styled.div`
  margin-left: auto;
  font-weight: bold;
  padding-left: 8px;
  text-align: right;
  word-break: break-all;
`;
