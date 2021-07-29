import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';
import Link from 'next/link';
import Routes from '../../../constants/RoutesEnum';
import { darken, lighten } from 'polished';

const LinkWrapper = styled.div`
  color: ${(props) => (props.theme.mode === 'light' ? lighten(0.3, props.theme.font) : darken(0.3, props.theme.font))};
  display: flex;
  cursor: pointer;
  width: fit-content;
  align-items: center;
  margin-bottom: 8px;
  transition: 0.25s;
  &:hover {
    color: ${(props) => props.theme.link};
  }
`;

const Text = styled.div`
  margin-left: 8px;
`;

function BackToPollsLink() {
  return (
    <Link href={Routes.Polls} passHref>
      <LinkWrapper>
        <BsArrowLeft size="24px" />
        <Text>Back to polls</Text>
      </LinkWrapper>
    </Link>
  );
}
export default BackToPollsLink;
