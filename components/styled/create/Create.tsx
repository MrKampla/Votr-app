import styled, { css } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { FramedContainer, UnframedContainer } from '../homepage';

const BorderLessBase = styled(TextareaAutosize)`
  outline: none;
  border: none;
  resize: none;
  overflow: hidden;
  color: ${(props) => props.theme.font};
  background-color: inherit;
  transition: background-color 0.25s, color 0.25s;
  font-family: Lato, Helvetica, sans-serif;
  font-weight: 900;
`;

export const BorderLessInput = styled(BorderLessBase)`
  font-size: 32px;
  margin-bottom: 16px;
`;

export const BorderLessDescription = styled(BorderLessBase)`
  font-size: 24px;
  margin-bottom: 32px;
`;

export const BorderLessInputToRightSide = styled(BorderLessBase)`
  font-size: 16px;
  text-align: right;
`;

export const SectionElementInput = styled(BorderLessBase)`
  font-size: 16px;
  text-align: center;
  width: 100%;
  padding: 2px 16px;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FramedTitle = styled.div`
  color: ${(props) => props.theme.font};
  font-size: 24px;
  border-bottom: 2px solid ${(props) => props.theme.border};
  padding: 16px 24px;
  min-height: fit-content;
  width: 100%;
  box-sizing: border-box;
  font-weight: 900;
`;

export const FramedSectionContentWrapper = styled.div<{ minWidth?: string }>`
  border: 2px solid ${(props) => props.theme.border};
  grid-column: 2 / auto;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  @media (min-width: ${(props) => props.theme.breakpoints.laptop}px) {
    width: ${({ minWidth }) => minWidth};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    border: none;
  }
`;

export const FramedContent = styled.div`
  color: ${(props) => props.theme.font};
  padding: 16px 24px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 8px 8px;
  }
`;

export const BoxColumn = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width ?? '100%'};
  box-sizing: border-box;
`;

export const WrappableBoxColumn = styled(BoxColumn)`
  @media (max-width: ${(props) => props.theme.breakpoints.laptop - 1}px) {
    width: 100%;
    padding: 0 0 32px 32px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile - 1}px) {
    padding: 16px 0;
  }
`;

export const WrappableFramedContainer = styled(FramedContainer)`
  @media (max-width: ${(props) => props.theme.breakpoints.laptop - 1}px) {
    flex-direction: column;
  }
`;

export const WrappableUnFramedContainer = styled(UnframedContainer)`
  @media (max-width: ${(props) => props.theme.breakpoints.laptop - 1}px) {
    flex-direction: column;
  }
`;

export const FramedElementWrapper = styled.div<{ isError?: boolean }>`
  border: 1px solid ${(props) => (props.isError ? props.theme.danger : props.theme.border)};
  border-radius: 32px;
  background: ${(props) => props.theme.disabled};
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
  flex: 1;
`;

export const FramedSectionContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const SeparatedList = styled.div`
  & > div {
    margin: 8px 0;
  }
  &:not(:first-child):not(:last-child) {
    margin: 4px 0px;
  }
`;

export const BorderLessSelect = styled.select<{ margin?: string }>`
  border: none;
  color: ${(props) => props.theme.font};
  background: ${(props) => props.theme.primary};
  margin: ${(props) => props.margin};
  transition: 0.25s;
  padding: 8px;
  text-align-last: right;
  option {
    direction: rtl;
  }
`;

export const BorderLessDatePicker = styled.input<{ margin?: string }>`
  border: none;
  outline: none;
  color: ${(props) => props.theme.font};
  background: ${(props) => props.theme.primary};
  margin: ${(props) => props.margin};
  transition: 0.25s;
  padding: 4px 0;
  text-align-last: right;
  font-weight: bold;
  ::-webkit-calendar-picker-indicator {
    filter: invert(${(props) => (props.theme.mode === 'dark' ? 1 : 0)});
  }
  option {
    direction: rtl;
  }
  &:after {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.font};
  }
`;

export const ThemedCheckbox = styled.input<{ margin?: string; disabled?: boolean }>`
  outline: none;
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  margin: ${(props) => props.margin};
`;

const InputBase = css`
  -webkit-appearance: none;
  outline: none;
  background-color: ${(props) => props.theme.disabled};
  color: ${(props) => props.theme.font};
  border: 1px solid ${(props) => props.theme.border};
  transition: 0.25s;
`;

export const VotingPowerInput = styled.input`
  ${InputBase}
  border-radius: 32px;
  padding: 4px 8px;
  font-weight: bold;
  width: 1ch;
`;

export const QuorumInput = styled.input`
  ${InputBase}
  width: -webkit-fill-available;
  width: stretch;
  border-radius: 8px;
  padding: 8px;
  text-align: right;
  margin-left: 11px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin: 0;
  }
`;
