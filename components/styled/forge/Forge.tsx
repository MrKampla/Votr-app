import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Controls } from '../homepage/Carousel';
import { FaLock } from 'react-icons/fa';
import { ButtonBase } from '../homepage';

export const TabSelector = styled.div<{
  isSelected: boolean;
  onClick: () => void;
}>`
  border-top: 2px ${(props) => props.theme.border} solid;
  width: 100%;
  color: ${(props) => props.theme.font};
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  transition: 0.25s;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    background-color: ${(props) => props.theme.disabled};
  }
  padding: 8px;
`;

export const ForgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
`;

export const ForgeHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const TabUnderline = styled.div<{ activeIdx: number; amountOfTabs: number }>`
  border-bottom: 4px ${(props) => props.theme.link} solid;
  transition: transform 0.4s ease;
  transform: translateX(${({ activeIdx }) => activeIdx * 100}%);
  display: flex;
  width: calc(100% / ${(props) => props.amountOfTabs});
`;

export const TabsSelectorContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const TabControls = styled(Controls)`
  margin-bottom: 0px;
`;

export const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.font};
  width: 100%;
  align-items: center;
  margin-left: 16px;
`;

export const LockIcon = styled(FaLock)`
  height: 64px;
  width: 64px;
  color: ${(props) => props.theme.font};
  transition: 0.25s;
`;

export const LockerContainer = styled.div`
  color: ${(props) => props.theme.font};
  padding: 24px;
  margin: 8px 0;
  max-width: 568px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 8px;
  }
`;

export const ValueInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: ${(props) => props.theme.disabled};
  color: ${(props) => props.theme.font};
  border: 1px solid ${(props) => props.theme.border};
  outline: none;
  transition: 0.25s;
  border-radius: 16px;
  line-height: 32px;
  text-align: center;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const BigMultiplier = styled.div`
  color: ${(props) => props.theme.cta};
  text-align: center;
  font-size: 48px;
  margin: 24px;
  font-weight: bold;
`;

export const UtilityButton = styled(ButtonBase)`
  padding: 8px 16px;
  &:hover {
    background: ${(props) =>
      props.theme.mode === 'light' ? darken(0.05, props.theme.disabled) : lighten(0.05, props.theme.disabled)};
  }
`;

export const CenteringContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Field = styled.div<{ margin?: string }>`
  margin: ${({ margin }) => margin ?? '0px 0px 16px'};
  width: 100%;
`;

export const TokenBalanceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TokenBalanceLabel = styled.div`
  margin-right: auto;
`;

export const Row = styled.div`
  display: flex;
`;

export const AllowanceDescriptor = styled.div<{ isSuccess: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isSuccess ? props.theme.success : props.theme.danger)};
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const WrappableDescriptor = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const AmountWrapper = styled.div`
  margin-left: auto;
  word-wrap: break-word;
  max-width: 320px;
`;

export const DetailsDescriptorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow-wrap: break-word;
`;

export const Flex = styled.div`
  display: flex;
`;

export const ToRight = styled.div`
  margin-left: auto;
`;
