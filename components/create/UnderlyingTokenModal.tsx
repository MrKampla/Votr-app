import { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import BaseModal from './BaseModal';
import {
  AddressInputWrapper,
  CloseModalIcon,
  ElementCard,
  ElementDescription,
  ElementsList,
  ElementTitle,
  ElementLogo,
  LoaderWrapper,
  TitleContentWrapper,
  TokenCardContainer,
  TokenLogoContainer,
} from '../styled/create/VotrModalStyled';
import EditableListElement from './EditableListElement';
import ERC20Contract from '../../contracts/ERC20.json';
import createContract from '../../utils/createContract';
import { ERC20 } from '../../contracts/@types';
import { WalletContext } from '../providers/WalletConnector';
import { RequestStatus } from '../../constants/requestStatus';
import { NETWORK_NAMES } from '../../constants/networkNames';
import { ThemeContext } from 'styled-components';
import useTokenList, { Token } from '../../utils/hooks/useTokenList';

export type ERC20Token = Pick<Token, 'name' | 'symbol' | 'address'>;

interface UnderlyingTokenModalProps {
  onChange: (pollType: ERC20Token) => void;
  selectedValue?: ERC20Token;
}

const UnderlyingTokenModal: React.FC<UnderlyingTokenModalProps> = ({ onChange, selectedValue }) => {
  const [defaultTokenList, isErrorWithFetchingTokenList] = useTokenList();
  const { ethereum } = useContext(WalletContext);
  const { link } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [customToken, setCustomToken] = useState<Token>();
  const [customPollTypeRequest, setCustomPollTypeRequest] = useState<RequestStatus>('idle');
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    if (!ethers.utils.isAddress(contractAddress)) {
      return;
    }
    const customTokenContract = createContract<ERC20>(ethereum, ERC20Contract.abi, contractAddress);
    setCustomPollTypeRequest('loading');
    async function fetchToken() {
      try {
        const token: Token = {
          name: await customTokenContract.name(),
          symbol: await customTokenContract.symbol(),
          address: contractAddress,
          logoURI: '/question.svg',
          chainId: (await ethereum.getNetwork()).chainId,
        };
        setCustomToken(token);
        setCustomPollTypeRequest('success');
      } catch (err) {
        toast.error('The given address does not belong to an ERC20 token contract');
        setCustomPollTypeRequest('error');
      }
    }
    fetchToken();
  }, [contractAddress, ethereum]);

  const listOfTokens = customToken ? [customToken] : defaultTokenList;

  return (
    <BaseModal margin={'0 0 0 28px'} isOpen={isOpen} setIsOpen={setIsOpen} selectedValue={selectedValue?.name}>
      <TitleContentWrapper>
        <div>Select underlying token</div>
        <CloseModalIcon onClick={() => setIsOpen(false)} />
      </TitleContentWrapper>
      <AddressInputWrapper>
        <EditableListElement
          element={{ id: 0, value: contractAddress }}
          placeholder="Token address"
          isError={customPollTypeRequest === 'error'}
          onChange={(e) => {
            setCustomToken(undefined);
            setContractAddress(e.target.value);
            setCustomPollTypeRequest('idle');
          }}
        />
      </AddressInputWrapper>
      {isErrorWithFetchingTokenList && <div>Couldn&quout;t load token list</div>}
      {customPollTypeRequest === 'loading' ? (
        <LoaderWrapper>
          <Loader type="Oval" color="#176EDE" height={'100%'} width={'100%'} />
        </LoaderWrapper>
      ) : (
        <ElementsList>
          {listOfTokens.map((token) => (
            <ElementCard
              key={token.address + token.chainId}
              onClick={() => {
                onChange(token);
                setIsOpen(false);
              }}
            >
              <TokenCardContainer>
                <div>
                  <ElementTitle>{token.symbol}</ElementTitle>
                  <ElementDescription>{token.name}</ElementDescription>
                  <ElementDescription color={link}>{NETWORK_NAMES[token.chainId as keyof typeof NETWORK_NAMES]}</ElementDescription>
                </div>
                <TokenLogoContainer>
                  <ElementLogo src={token.logoURI} layout="fixed" width="24px" height="24px" />
                </TokenLogoContainer>
              </TokenCardContainer>
            </ElementCard>
          ))}
        </ElementsList>
      )}
    </BaseModal>
  );
};

export default UnderlyingTokenModal;
