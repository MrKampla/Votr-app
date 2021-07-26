import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { generateAddressLinkToEtherscan } from '../../../utils/generateLinkToEtherscan';
import shortenAddress from '../../../utils/shortenAddress';

const AddressLinkWrapper = styled.a`
  text-decoration: none;
  color: unset;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    color: ${(props) => props.theme.link};
  }
`;

const AddressLink = ({ address }: { address: string }) => {
  const [generatedLink, setGeneratedLink] = useState('...');
  useEffect(() => {
    generateAddressLinkToEtherscan(address).then((link) => setGeneratedLink(link));
  });
  return (
    <AddressLinkWrapper href={generatedLink !== '...' ? generatedLink : undefined} target="_blank" rel="noreferrer">
      {shortenAddress(address)}
    </AddressLinkWrapper>
  );
};

export default AddressLink;
