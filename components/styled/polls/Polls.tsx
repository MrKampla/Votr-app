import { lighten, darken } from 'polished';
import styled from 'styled-components';
import { PollStatus } from '../../polls/PollList';
import { ButtonBase } from '../homepage';

export const Title = styled.h1`
  color: ${(props) => props.theme.font};
  font-weight: 900;
  font-size: 24px;
`;

export const ListWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  width: 100%;
  & > div {
    border-bottom: 1px solid ${(props) => props.theme.border};
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  & > div:last-child {
    border: none;
  }
`;

export const ListElement = styled.div`
  height: 64px;
  color: ${(props) => props.theme.font};
  &:hover {
    background: ${(props) => props.theme.disabled};
  }
  transition: 0.25s;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: fit-content;
  }
`;

export const LoadMoreButton = styled(ButtonBase)`
  align-self: center;
  color: ${({ theme }) => theme.font};
  &:hover {
    color: ${({ theme }) => (theme.mode === 'light' ? lighten(0.3, theme.font) : darken(0.3, theme.font))};
  }
`;

export const Box = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    padding: 8px;
  }
`;

export const ElementRow = styled.div`
  padding: 4px 16px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  height: 32px;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: fit-content;
  }
`;

export const ChipWrapper = styled.div<{ value: PollStatus }>`
  display: flex;
  border-radius: 16px;
  font-size: 12px;
  height: 16px;
  width: 48px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  background: ${({ theme, value }) => {
    if (theme.mode === 'light') {
      return value === 'Active' ? theme.success : theme.disabled;
    } else {
      return value === 'Active' ? theme.success : theme.font;
    }
  }};
  border: 1px solid ${({ theme, value }) => (value === 'Active' ? theme.success : 'rgba(37, 39, 45, 0.16)')};
  color: ${({ theme, value }) => {
    if (theme.mode === 'light') {
      return value === 'Active' ? theme.primary : theme.font;
    } else {
      return value === 'Active' ? theme.font : theme.primary;
    }
  }};
`;

export const PollTitle = styled.div`
  font-size: 16px;
  margin-left: 8px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PollDescriptionRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    span {
      font-weight: 900;
    }
    margin: 0 2px;
  }
  opacity: 0.8;
`;

export const EmptyPollListNotification = styled.div`
  color: ${({ theme }) => theme.font};
`;
