import styled from 'styled-components';
import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';
import WalletConnector from '../providers/WalletConnector';

const HeaderWrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 0;
  margin: 0;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <RightSide>
        <ThemeSwitch />
        <WalletConnector />
      </RightSide>
    </HeaderWrapper>
  );
};

export default Header;
