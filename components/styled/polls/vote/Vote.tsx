import styled from 'styled-components';

export const ReadOnlyListElementContainer = styled.div`
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 32px;
  background: ${(props) => props.theme.disabled};
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
`;

export const IndexWrapper = styled.div`
  flex: 1;
  word-break: break-word;
  text-align: left;
`;

export const MainContentWrapper = styled.div`
  flex: 2;
  text-align: center;
  padding: 0 8px;
`;

export const EndAdornmentWrapper = styled.div`
  flex: 1;
  word-break: break-word;
  text-align: right;
`;

export const SelectableListElement = styled.div<{ isSelected: boolean }>`
  border: 2px solid ${(props) => (props.isSelected ? props.theme.cta : props.theme.border)};
  border-radius: 32px;
  background: ${(props) => props.theme.disabled};
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
  cursor: pointer;
  &:hover {
    border: 2px solid ${(props) => props.theme.cta};
  }
`;

export const ExecuteCallbackWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const CallbackBlockerWrapper = styled.div`
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
`;

export const PropertiesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
