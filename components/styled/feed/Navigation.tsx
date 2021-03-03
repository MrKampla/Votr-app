import styled from 'styled-components';

export const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  flex-wrap: wrap;
`;

export const LinkText = styled.p<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) => (isSelected ? theme.cta : theme.font)};
  text-decoration: none;
  cursor: pointer;
  margin: 0 16px;
  font-size: 32px;
  font-weight: 900;
  transition: 0.25s;
  &:hover {
    color: ${(props) => props.theme.link};
  }
`;
