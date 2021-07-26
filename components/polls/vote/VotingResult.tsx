import React from 'react';
import ProgressBar from './ProgressBar';

interface VotingResultProps {
  name: string;
  amount: number;
  symbol: string;
  percent: number;
}

const VotingResult = ({ name, amount, percent, symbol }: VotingResultProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ flex: 1 }}>{name}</div>
        <div style={{ flex: 2, textAlign: 'center' }}>
          {amount} {symbol}
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>{percent}%</div>
      </div>
      <ProgressBar percent={percent} />
    </div>
  );
};
export default VotingResult;
