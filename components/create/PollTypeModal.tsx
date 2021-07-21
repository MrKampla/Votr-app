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
  LoaderWrapper,
  TitleContentWrapper,
} from '../styled/create/VotrModalStyled';
import EditableListElement from './EditableListElement';
import { usePollTypesContracts } from '../../utils/hooks/usePollTypesContracts';
import IPollTypeContract from '../../contracts/IPollType.json';
import createContract from '../../utils/createContract';
import { IPollType } from '../../contracts/@types';
import { WalletContext } from '../providers/WalletConnector';
import { PollType } from '../../constants/pollTypes';
import { RequestStatus } from '../../constants/requestStatus';

interface PollTypeModalProps {
  onChange: (pollType: PollType) => void;
  selectedValue?: PollType;
}

const PollTypeModal: React.FC<PollTypeModalProps> = ({ onChange, selectedValue }) => {
  const defaultPollTypes = usePollTypesContracts();
  const { ethereum } = useContext(WalletContext);
  const [isOpen, setIsOpen] = useState(false);
  const [customPollType, setCustomPollType] = useState<PollType>();
  const [customPollTypeRequest, setCustomPollTypeRequest] = useState<RequestStatus>('idle');
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    if (!ethers.utils.isAddress(contractAddress)) {
      return;
    }
    const customPollType = createContract<IPollType>(ethereum, IPollTypeContract.abi, contractAddress);
    setCustomPollTypeRequest('loading');
    customPollType
      .getPollTypeName()
      .then((pollTypeName) => {
        setCustomPollType({
          name: pollTypeName,
          address: contractAddress,
          description: 'Custom poll implementation',
        });
        setCustomPollTypeRequest('success');
      })
      .catch(() => {
        toast.error('The given address does not belong to a Votr poll type contract');
        setCustomPollTypeRequest('error');
      });
  }, [contractAddress, ethereum]);

  const listOfPolls = customPollType ? [customPollType] : defaultPollTypes;

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} selectedValue={selectedValue?.name}>
      <TitleContentWrapper>
        <div>Select a poll type</div>
        <CloseModalIcon onClick={() => setIsOpen(false)} />
      </TitleContentWrapper>
      <AddressInputWrapper>
        <EditableListElement
          element={{ id: 0, value: contractAddress }}
          placeholder="Contract address"
          isError={customPollTypeRequest === 'error'}
          onChange={(e) => {
            setCustomPollType(undefined);
            setContractAddress(e.target.value);
            setCustomPollTypeRequest('idle');
          }}
        />
      </AddressInputWrapper>
      {customPollTypeRequest === 'loading' ? (
        <LoaderWrapper>
          <Loader type="Oval" color="#176EDE" height={'100%'} width={'100%'} />
        </LoaderWrapper>
      ) : (
        <ElementsList>
          {listOfPolls.map((pollType) => (
            <ElementCard
              key={pollType.address}
              onClick={() => {
                onChange(pollType);
                setIsOpen(false);
              }}
            >
              <ElementTitle>{pollType.name}</ElementTitle>
              <ElementDescription>{pollType.description}</ElementDescription>
            </ElementCard>
          ))}
        </ElementsList>
      )}
    </BaseModal>
  );
};

export default PollTypeModal;
