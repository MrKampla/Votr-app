import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Routes from '../../../constants/RoutesEnum';
import shortenAddress from '../../../utils/shortenAddress';
import { ExternalLink, ExternalLinkIcon } from '../../styled/create/VotrModalStyled';

const ForgeLinkWrapper = styled.div`
  margin-right: 8px;
  font-size: 14px;
  font-weight: normal;
  line-height: 100%;
`;

const LinkToForge = ({
  underlyingTokenAddress,
  pollAddress,
}: {
  underlyingTokenAddress: string;
  pollAddress: string;
}) => {
  return (
    <Link href={`${Routes.Forge}?token=${underlyingTokenAddress}?poll=${pollAddress}`} passHref>
      <ExternalLink>
        <ForgeLinkWrapper>{shortenAddress(underlyingTokenAddress)}</ForgeLinkWrapper>
        <ExternalLinkIcon />
      </ExternalLink>
    </Link>
  );
};

export default LinkToForge;
