import { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import BaseModal, { ModalProps } from './BaseModal';
import {
  AddressInputWrapper,
  CloseModalIcon,
  ElementsList,
  LoaderWrapper,
  TitleContentWrapper,
  TickLogo,
  ErrorLogo,
  TextCenterContainer,
  ClearCallbackButton,
  FooterWrapper,
  MainContentWrapper,
} from '../styled/create/VotrModalStyled';
import EditableListElement from './EditableListElement';
import { WalletContext } from '../providers/WalletConnector';
import { RequestStatus } from '../../constants/requestStatus';
import shortenAddress from '../../utils/shortenAddress';
import { DisabledButton } from '../styled/homepage';

const CallbackModal = ({ onChange, selectedValue, isReadOnly }: ModalProps<string>) => {
  const { ethereum } = useContext(WalletContext);
  const [isOpen, setIsOpen] = useState(false);
  const [callbackContractAddress, setCallbackContractAddress] = useState<string>();
  const [callbackContractCheckRequest, setCallbackContractCheckRequest] = useState<RequestStatus>('idle');

  useEffect(() => {
    if (!ethers.utils.isAddress(callbackContractAddress!)) {
      return;
    }
    setCallbackContractCheckRequest('loading');
    async function fetchAndCheckCallbackContract() {
      try {
        const code = await ethereum.getCode(callbackContractAddress!);
        if (code.length < 3) {
          // accounts or non egsisting contracts return '0x' value
          throw new Error('Selected address does not belong to any contract');
        }
        setCallbackContractCheckRequest('success');
        onChange?.(callbackContractAddress!);
      } catch (err) {
        onChange?.('');
        toast.error('The given contract cannot be called by Votr');
        setCallbackContractCheckRequest('error');
      }
    }
    fetchAndCheckCallbackContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callbackContractAddress, ethereum]);

  return (
    <BaseModal
      margin={'0 0 0 10px'}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selectedValue={selectedValue ? shortenAddress(selectedValue) : ''}
      isReadOnly={isReadOnly}
    >
      <TitleContentWrapper>
        <div>Select callback contract</div>
        <CloseModalIcon onClick={() => setIsOpen(false)} />
      </TitleContentWrapper>
      <AddressInputWrapper>
        <EditableListElement
          element={{ id: 0, value: callbackContractAddress! }}
          placeholder="Contract callback address"
          isError={callbackContractCheckRequest === 'error'}
          onChange={(e) => {
            setCallbackContractAddress(e.target.value);
            setCallbackContractCheckRequest('idle');
          }}
        />
      </AddressInputWrapper>
      <MainContentWrapper>
        {callbackContractCheckRequest === 'loading' ? (
          <LoaderWrapper>
            <Loader type="Oval" color="#176EDE" height={'100%'} width={'100%'} />
          </LoaderWrapper>
        ) : (
          <ElementsList>
            <TextCenterContainer>
              {callbackContractCheckRequest === 'success' && (
                <>
                  <TickLogo /> Everything seems to be fine with the selected contract!
                </>
              )}
              {callbackContractCheckRequest === 'error' && (
                <>
                  <ErrorLogo /> Selected contract does not meet the requirements
                </>
              )}
            </TextCenterContainer>
          </ElementsList>
        )}
      </MainContentWrapper>
      <FooterWrapper>
        {callbackContractAddress === '' ? (
          <DisabledButton margin="8px">Clear</DisabledButton>
        ) : (
          <ClearCallbackButton
            onClick={() => {
              onChange?.('');
              setCallbackContractAddress('');
              setCallbackContractCheckRequest('idle');
            }}
          >
            Clear
          </ClearCallbackButton>
        )}
      </FooterWrapper>
    </BaseModal>
  );
};

export default CallbackModal;
