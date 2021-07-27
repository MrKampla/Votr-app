import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { FramedElementWrapper } from './Create';
import { darken, lighten } from 'polished';

export const ElementKey = styled.span`
  font-weight: bold;
`;

export const CloseIcon = styled(IoCloseOutline)`
  cursor: pointer;
  color: ${({ theme }) => theme.font};
`;

export const FramedSectionButton = styled(FramedElementWrapper)`
  cursor: pointer;
  padding: 9px 16px;
  font-weight: 900;
  &:hover {
    background: ${(props) =>
      props.theme.mode === 'light' ? darken(0.05, props.theme.disabled) : lighten(0.05, props.theme.disabled)};
  }
  * {
    cursor: pointer;
  }
`;

export const PropertiesElement = styled.div<{ break?: boolean }>`
  display: flex;
  align-items: center;
  font-weight: bold;
  white-space: nowrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    align-items: ${(props) => props.break && 'flex-start'};
    flex-direction: ${(props) => props.break && 'column'};
  }
`;
