import { createContext, SetStateAction, useEffect, useState } from 'react';
import { Web3Instance } from './WalletConnector';
import VotrPollFactoryContract from '../../contracts/VotrPollFactory.json';
import createContract from '../../utils/createContract';
import { VotrPollFactory } from '../../contracts/@types/VotrPollFactory';
import toast from 'react-hot-toast';
import { Network } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Dispatch } from 'react';

interface VotrContracts {
  pollFactory?: VotrPollFactory;
}

export const VotrContractsContext = createContext<VotrContracts>({});

async function initializeContracts(
  ethereum: Web3Instance,
  setPollFactory: Dispatch<SetStateAction<VotrPollFactory | undefined>>,
  chainId: number
) {
  setPollFactory(
    createContract<VotrPollFactory>(ethereum, VotrPollFactoryContract.abi, (VotrPollFactoryContract.networks as any)[chainId].address)
  );
}

function useVotrContracts() {
  const [pollFactory, setPollFactory] = useState<VotrPollFactory>();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
    const listener = (newNetwork: Network, _oldNetwork?: Network) => {
      if (!Object.keys(VotrPollFactoryContract.networks).includes(newNetwork.chainId.toString())) {
        toast.error(`Unsupported chain, make sure You're on the correct network`);
        return;
      }
      initializeContracts(provider, setPollFactory, newNetwork.chainId);
    };
    provider.on('network', listener);
    return () => {
      provider.removeListener('network', listener);
    };
  }, []);

  return { pollFactory };
}

const ContractInitializer: React.FC = ({ children }) => {
  const contracts = useVotrContracts();
  return <VotrContractsContext.Provider value={contracts}>{children}</VotrContractsContext.Provider>;
};

export default ContractInitializer;
