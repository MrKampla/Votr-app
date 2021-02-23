import { useContext, useEffect, useState } from 'react';
import { VotrContractsContext } from '../ContractInitializer';
import CountUp from 'react-countup';
import { FadeIn, YellowText } from '../styled/homepage';

const PollsParagraph: () => JSX.Element = () => {
  const [numberOfPolls, setNumberOfPolls] = useState<string>();
  const { pollFactory } = useContext(VotrContractsContext);
  useEffect(() => {
    if (!pollFactory) return;
    pollFactory.methods
      .numberOfPolls()
      .call()
      .then((res) => setNumberOfPolls(res));
  }, [pollFactory]);
  return (
    <FadeIn show={!!pollFactory}>
      Votr users have created a total of{' '}
      <YellowText>
        <CountUp end={parseInt(numberOfPolls ?? '0')} delay={0.99} duration={3} />
      </YellowText>{' '}
      polls
    </FadeIn>
  );
};
export default PollsParagraph;
