import { createContext, useContext, useEffect, useState } from 'react';
import { WalletContext } from './WalletConnector';
import VotrPollFactoryContract from '../../contracts/VotrPollFactory.json';
import createContract from '../../utils/createContract';
import { VotrPollFactory } from '../../contracts/@types/VotrPollFactory';

interface VotrContracts {
  pollFactory?: VotrPollFactory;
}

export const VotrContractsContext = createContext<VotrContracts>({});

function useVotrContracts() {
  const { ethereum } = useContext(WalletContext);
  const [pollFactory, setPollFactory] = useState<VotrPollFactory>();

  async function initializeContracts() {
    if (!ethereum) {
      return;
    }
    const networkId = await ethereum.eth.net.getId();
    setPollFactory(
      createContract<VotrPollFactory>(ethereum, VotrPollFactoryContract.abi, (VotrPollFactoryContract.networks as any)[networkId].address)
    );
  }

  useEffect(() => {
    initializeContracts();
  }, [ethereum]);

  return { pollFactory };
}

const ContractInitializer: React.FC = ({ children }) => {
  const contracts = useVotrContracts();
  return <VotrContractsContext.Provider value={contracts}>{children}</VotrContractsContext.Provider>;
};

export default ContractInitializer;
