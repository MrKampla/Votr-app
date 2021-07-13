import { NextRouter } from 'next/router';
import Link from 'next/link';
import PollsParagraph from './PollsParagraph';
import { ActionButton, DisabledButton, YellowText } from '../styled/homepage';
import Routes from '../../constants/RoutesEnum';

export const CARDS: {
  key: string;
  title: JSX.Element;
  description: string;
  Paragraph?: () => JSX.Element;
  button: (router: NextRouter) => JSX.Element;
}[] = [
  {
    key: 'start',
    title: (
      <>
        <YellowText>Votr</YellowText> is a ready-made solution for <YellowText>on-chain democracy</YellowText> that can be{' '}
        <YellowText>easly integrated </YellowText>into every environment
      </>
    ),
    Paragraph: PollsParagraph,
    description: ' In need of truly decentralized governance? Create a poll and invite stakeholders to make a decision together.',
    button: (router) => <ActionButton onClick={() => router.push(Routes.Polls)}>Go to app</ActionButton>,
  },
  {
    key: 'contribute',
    title: (
      <>
        This protocol will definetly fit <YellowText>Your needs</YellowText> but just in case You are{' '}
        <YellowText>free to contribute</YellowText>
      </>
    ),
    description:
      'We listen to the voice of community but we also like working implementations. Anyone can create Their own poll type and deploy it to the Votr protocol for others to use.',
    button: () => (
      <Link passHref href={'http://www.github.com/mrkampla'}>
        <ActionButton>Contribute</ActionButton>
      </Link>
    ),
  },
  {
    key: 'programmable',
    title: (
      <>
        First <YellowText>fully programmable </YellowText>governance protocol
      </>
    ),
    description:
      "Sometimes people don't live up to their end of the bargain. But code does. Stop relaying on someone’s given word and just write it to the blockchain. You can specify functions that will be called depending on the outcome of the poll.",
    button: () => (
      <Link passHref href={'http://www.github.com/mrkampla'}>
        <ActionButton>Go to documentation</ActionButton>
      </Link>
    ),
  },
  {
    key: 'public-polls',
    title: (
      <>
        Votr also supports <YellowText>public polls &amp; proposals</YellowText>
      </>
    ),
    description:
      'If the target of Your poll is a broader audience, Votr will help You with creation of a token and distributing it at Your discretion. Votr also supports voting with existing ERC-20 tokens.',
    button: (router) => <ActionButton onClick={() => router.push(Routes.Create)}>Go to app</ActionButton>,
  },
  {
    key: 'govern',
    title: (
      <>
        Govern the <YellowText>Votr protocol</YellowText>
      </>
    ),
    description: 'Do You have any enhancement proposals? Just inform the community about that idea, and together we will figure it out.',
    button: () => <DisabledButton>Not yet ready</DisabledButton>,
  },
];
