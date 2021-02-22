import { useContext } from 'react';
import { CgSun } from 'react-icons/cg';
import { IoMdMoon } from 'react-icons/io';
import styled, { css } from 'styled-components';
import { ToggleThemeContext } from '../theme/Provider';

const ThemeSwitcherBase = css`
  color: ${(props) => props.theme.font};
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.25s;
  margin-right: 24px;
  &:hover {
    color: ${(props) => props.theme.cta};
  }
`;

const Sun = styled(CgSun)`
  ${ThemeSwitcherBase}
`;

const Moon = styled(IoMdMoon)`
  ${ThemeSwitcherBase}
`;

const ThemeSwitch: React.FC = ({}) => {
  const { value, toggle } = useContext(ToggleThemeContext);
  return value ? <Moon onClick={toggle} /> : <Sun onClick={toggle} />;
};

export default ThemeSwitch;
