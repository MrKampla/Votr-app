import React, { useContext } from 'react';
import styled from 'styled-components';
import { generateAddressLink } from '../../../utils/generateLinkToEtherscan';
import shortenAddress from '../../../utils/shortenAddress';
import { VotrContractsContext } from '../../providers/ContractInitializer';

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
  const { networkId } = useContext(VotrContractsContext);

  return (
    <AddressLinkWrapper href={generateAddressLink(address, networkId!)} target="_blank" rel="noreferrer">
      {shortenAddress(address)}
    </AddressLinkWrapper>
  );
};

export default AddressLink;
