import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  logoURI: string;
}

export interface TokenListResponse {
  tokens: Token[];
}

function useTokenList(): [Token[], boolean] {
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get<TokenListResponse>('https://gateway.ipfs.io/ipns/tokens.uniswap.org')
      .then((res) => setTokenList(res.data.tokens.map(handleTokensWithIPFSLogos)))
      .catch(() => setIsError(true));
  }, []);
  return [tokenList, isError];
}

const handleTokensWithIPFSLogos = (token: Token) => {
  if (token.logoURI.startsWith('ipfs')) {
    return {
      ...token,
      logoURI: `https://ipfs.io/ipfs/${removeProtocolFromLink(token.logoURI)}`,
    };
  }
  return token;
};

function removeProtocolFromLink(link: string) {
  return link.slice(7);
}

export default useTokenList;
