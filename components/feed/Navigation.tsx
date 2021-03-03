import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavWrapper, LinkText } from '../styled/feed/Navigation';

const Navigation: React.FC = ({}) => {
  const router = useRouter();
  return (
    <NavWrapper>
      <Link href="/feed" passHref>
        <LinkText isSelected={router.pathname === '/feed'}>Feed</LinkText>
      </Link>
      <Link href="/create" passHref>
        <LinkText isSelected={router.pathname === '/create'}>Create</LinkText>
      </Link>
      <Link href="/vote" passHref>
        <LinkText isSelected={router.pathname === '/vote'}>Vote</LinkText>
      </Link>
    </NavWrapper>
  );
};

export default Navigation;
