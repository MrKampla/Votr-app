import { useContext, useEffect, useState } from 'react';
import { VotrContractsContext } from '../providers/ContractInitializer';
import CountUp from 'react-countup';
import { FadeIn, YellowText } from '../styled/homepage';

const PollsParagraph: () => JSX.Element = () => {
  const [numberOfPolls, setNumberOfPolls] = useState<number>();
  const { pollFactory } = useContext(VotrContractsContext);
  useEffect(() => {
    if (!pollFactory) return;
    pollFactory.numberOfPolls().then((res) => setNumberOfPolls(res.toNumber()));
  }, [pollFactory]);
  return (
    <FadeIn show={!!pollFactory && !!numberOfPolls}>
      {!!numberOfPolls && (
        <>
          Votr users have created a total of{' '}
          <YellowText>
            <CountUp end={numberOfPolls} duration={3} />
          </YellowText>{' '}
          polls
        </>
      )}
    </FadeIn>
  );
};
export default PollsParagraph;
