import Link from 'next/link';
import { useRouter } from 'next/router';
import Routes from '../../constants/RoutesEnum';
import { NavWrapper, LinkText } from '../styled/polls/Navigation';

const Navigation: React.FC = ({}) => {
  const router = useRouter();
  return (
    <NavWrapper>
      <Link href={Routes.Polls} passHref>
        <LinkText isSelected={router.pathname.includes(Routes.Polls)}>Polls</LinkText>
      </Link>
      <Link href={Routes.Create} passHref>
        <LinkText isSelected={router.pathname === Routes.Create}>Create</LinkText>
      </Link>
      <Link href={Routes.Forge} passHref>
        <LinkText isSelected={router.pathname === Routes.Forge}>Forge</LinkText>
      </Link>
    </NavWrapper>
  );
};

export default Navigation;
