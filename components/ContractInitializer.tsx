import { createContext, useContext, useEffect, useState } from 'react';
import { WalletContext } from './header/WalletConnector';
import VotrPollFactoryContract from '../contracts/VotrPollFactory.json';
import VotrSeriesFactoryContract from '../contracts/VotrSeriesFactory.json';
import createContract from '../scripts/createContract';
import { VotrPollFactory } from '../contracts/@types/VotrPollFactory';
import { VotrSeriesFactory } from '../contracts/@types/VotrSeriesFactory';

interface VotrContracts {
  pollFactory?: VotrPollFactory;
  seriesFactory?: VotrSeriesFactory;
}

export const VotrContractsContext = createContext<VotrContracts>({});

function useVotrContracts() {
  const { ethereum } = useContext(WalletContext);
  const [pollFactory, setPollFactory] = useState<VotrPollFactory>();
  const [seriesFactory, setSeriesFactory] = useState<VotrSeriesFactory>();

  async function initializeContracts() {
    if (!ethereum) {
      return;
    }
    const networkId = await ethereum.eth.net.getId();
    setPollFactory(
      createContract<VotrPollFactory>(ethereum, VotrPollFactoryContract.abi, (VotrPollFactoryContract.networks as any)[networkId].address)
    );
    setSeriesFactory(
      createContract<VotrSeriesFactory>(
        ethereum,
        VotrSeriesFactoryContract.abi,
        (VotrSeriesFactoryContract.networks as any)[networkId].address
      )
    );
  }

  useEffect(() => {
    initializeContracts();
  }, [ethereum]);

  return { pollFactory, seriesFactory };
}

const ContractInitializer: React.FC = ({ children }) => {
  const contracts = useVotrContracts();
  return <VotrContractsContext.Provider value={contracts}>{children}</VotrContractsContext.Provider>;
};

export default ContractInitializer;
