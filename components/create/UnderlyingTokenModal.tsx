import { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import BaseModal, { ModalProps } from './BaseModal';
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
  FooterWrapper,
  MainContentWrapper,
  ClearCallbackButton,
  TokenDetailsContainer,
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
import { DisabledButton } from '../styled/homepage';

export type ERC20Token = Pick<Token, 'name' | 'symbol' | 'address'>;

const UnderlyingTokenModal = ({ onChange, selectedValue, isReadOnly, externalLink }: ModalProps<ERC20Token>) => {
  const [listOfTokens, isErrorWithFetchingTokenList] = useTokenList();
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
    const tokenContract = createContract<ERC20>(ethereum, ERC20Contract.abi, contractAddress);
    setCustomPollTypeRequest('loading');
    async function fetchToken() {
      try {
        const token = await prepeareTokenObject((await ethereum.getNetwork()).chainId, tokenContract);
        setCustomToken(token);
        setCustomPollTypeRequest('success');
      } catch (err) {
        toast.error('The given address does not belong to an ERC20 token contract');
        setCustomPollTypeRequest('error');
      }
    }
    fetchToken();
  }, [contractAddress, ethereum]);

  return (
    <BaseModal
      margin={'0 0 0 28px'}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selectedValue={selectedValue?.name}
      isReadOnly={isReadOnly}
      externalLink={externalLink}
    >
      <TitleContentWrapper>
        <div>Select underlying token</div>
        <CloseModalIcon onClick={() => setIsOpen(false)} />
      </TitleContentWrapper>
      <AddressInputWrapper>
        <EditableListElement
          element={{ id: 0, value: contractAddress }}
          placeholder="Token address"
          isError={customPollTypeRequest === 'error'}
          onChange={async (e) => {
            setCustomToken(undefined);
            setContractAddress(e.target.value);
            setCustomPollTypeRequest('idle');
          }}
        />
      </AddressInputWrapper>
      <MainContentWrapper>
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
                isSelected={token.address === customToken?.address}
                onClick={async () => {
                  onChange?.(token);
                  const customToken = listOfTokens.find((tokenFromList) => tokenFromList.address === token.address);
                  try {
                    const tokenContract = createContract<ERC20>(ethereum, ERC20Contract.abi, token.address);
                    setCustomToken(
                      customToken ?? (await prepeareTokenObject((await ethereum.getNetwork()).chainId, tokenContract))
                    );
                  } catch (err) {}
                  setIsOpen(false);
                }}
              >
                <TokenCardContainer>
                  <TokenDetailsContainer>
                    <ElementTitle>{token.symbol}</ElementTitle>
                    <ElementDescription>{token.name}</ElementDescription>
                    <ElementDescription color={link}>
                      {NETWORK_NAMES[token.chainId as keyof typeof NETWORK_NAMES]}
                    </ElementDescription>
                  </TokenDetailsContainer>
                  <TokenLogoContainer>
                    <ElementLogo src={token.logoURI} layout="fixed" width="24px" height="24px" />
                  </TokenLogoContainer>
                </TokenCardContainer>
              </ElementCard>
            ))}
          </ElementsList>
        )}
      </MainContentWrapper>
      <FooterWrapper>
        {customToken === undefined ? (
          <DisabledButton margin="8px">Clear</DisabledButton>
        ) : (
          <ClearCallbackButton
            onClick={() => {
              onChange?.((undefined as unknown) as ERC20Token);
              setCustomToken((undefined as unknown) as Token);
              setCustomPollTypeRequest('idle');
            }}
          >
            Clear
          </ClearCallbackButton>
        )}
      </FooterWrapper>
    </BaseModal>
  );
};

export default UnderlyingTokenModal;

const prepeareTokenObject = async (chainId: number, tokenContract: ERC20): Promise<Token> => ({
  name: await tokenContract.name(),
  symbol: await tokenContract.symbol(),
  address: tokenContract.address,
  logoURI: '/question.svg',
  chainId: chainId,
});
