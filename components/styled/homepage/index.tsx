import styled from 'styled-components';
import { darken } from 'polished';

export const FramedContainer = styled.div`
  border: 2px solid ${(props) => props.theme.border};
  grid-column: 2 / auto;
  border-radius: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const UnframedContainer = styled(FramedContainer)`
  border: none;
`;

export const ContentWrapper = styled.div`
  display: grid;
  overflow-x: hidden;
  grid-template-columns: 1fr min(1024px, 100%) 1fr;
  margin-top: 32px;
  padding: 8px;
`;

export const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.font};
  padding: 0px 32px 48px 0;
  @media (min-width: ${(props) => props.theme.breakpoints.laptop}px) {
    max-width: 480px;
  }
`;

export const Box = styled.div<{ padding?: string; paddingMobile?: string; noWrap?: boolean }>`
  padding: ${({ padding }) => padding ?? '32px'};
  display: flex;
  flex-direction: row;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile - 1}px) {
    padding: ${({ paddingMobile }) => paddingMobile ?? '24px'};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.laptop - 1}px) {
    flex-direction: ${({ noWrap }) => (noWrap ? '' : 'column')};
  }
`;

export const YellowText = styled.span`
  color: ${(props) => props.theme.cta};
`;

export const Description = styled.div`
  color: ${(props) => props.theme.font};
  font-size: 18px;
  font-weight: bold;
  padding-right: 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.laptop + 1}px) {
    max-width: 480px;
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonBase = styled.button`
  padding: 16px 32px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 32px;
  width: fit-content;
  color: ${(props) => (props.theme.mode === 'light' ? props.theme.font : props.theme.primary)};
  background: ${(props) => props.theme.disabled};
  margin-top: 16px;
  transition: 0.25s;
`;

export const ActionButton = styled(ButtonBase)`
  background: ${(props) => props.theme.cta};
  &:hover {
    background: ${(props) => darken(0.15, props.theme.cta)};
  }
`;

export const DisabledButton = styled(ButtonBase)`
  background: ${(props) => props.theme.disabled};
  color: ${(props) => props.theme.font};
  cursor: not-allowed;
`;

export const ParagraphWrapper = styled.div`
  color: ${(props) => props.theme.font};
  font-size: 18px;
  font-weight: bold;
  padding-right: 32px;
`;

export const FadeIn = styled.div<{ show: boolean }>`
  transition: all 1s ease;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform-origin: center bottom;
  transform: ${({ show }) => `scale(${show ? 1 : 0.8}) translateY(${show ? 0 : 20}px)`};
`;
