import { useContext } from 'react';
import styled from 'styled-components';
import BallotBox from '../../public/BallotBox.svg';
import BallotBoxWhite from '../../public/BallotBoxWhite.svg';
import Line from '../../public/Line.svg';
import { ToggleThemeContext } from '../theme/Provider';
import { useRouter } from 'next/router';
import Routes from '../../constants/RoutesEnum';

const LogoWrapper = styled.div`
  margin-left: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: fit-content;
`;

const BallotBoxIcon = styled(BallotBox)``;

const LineIcon = styled(Line)`
  margin-left: 8px;
  height: 46px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`;

const VotrWrapper = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-left: 8px;
  text-align: center;
  user-select: none;
  color: ${(props) => props.theme.font};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`;

const Logo: React.FC = () => {
  const router = useRouter();
  const { value: isDarkMode } = useContext(ToggleThemeContext);
  return (
    <LogoWrapper onClick={() => router.push(Routes.Homepage)}>
      {isDarkMode ? <BallotBoxWhite /> : <BallotBoxIcon />}
      <LineIcon />
      <VotrWrapper>VOTR</VotrWrapper>
    </LogoWrapper>
  );
};
export default Logo;
