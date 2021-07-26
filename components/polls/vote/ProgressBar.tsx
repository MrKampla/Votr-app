import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  height: 8px;
  width: 100%;
  border-radius: 0.4rem;
  background: #d9d9d9;
`;

const Progress = styled.div<{ percent: number }>`
  height: 100%;
  width: ${(props) => `${props.percent}%`};
  border-radius: 0.4rem;
  background: #176ede;
  transition: width 0.4s ease;
`;

const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <ProgressContainer>
      <Progress percent={percent} />
    </ProgressContainer>
  );
};

export default ProgressBar;
