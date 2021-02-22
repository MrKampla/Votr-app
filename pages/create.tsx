import styled from 'styled-components';
import Link from 'next/link';
const Box = styled.div`
  color: Black;
  font-size: 50px;
`;

const LinkText = styled.p`
  color: green;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export default function Create() {
  return (
    <>
      <Box>Create page</Box>
      <Link href="/" passHref>
        <LinkText>Back to main</LinkText>
      </Link>
    </>
  );
}
