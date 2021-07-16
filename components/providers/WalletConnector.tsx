import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { ethers } from 'ethers';
import shortenAddress from '../../utils/shortenAddress';
import { isNetworkSupported } from '../../utils/isNetworkSupported';
import { VotrContractsContext } from './ContractInitializer';

const Connector = styled.div<{ errorBorder: boolean }>`
  color: ${(props) => props.theme.font};
  border: ${(props) => (props.errorBorder ? `1px ${props.theme.danger} solid` : '')};
  border-radius: 16px;
  padding: 8px 10px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-right: 32px;
  transition: 0.25s;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.cta};
  }
`;

export type WalletState = {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
  initConnection: () => Promise<void>;
  ethereum: Web3Instance;
};

export const WalletContext = createContext<WalletState>({} as WalletState);

export type Web3Instance = ethers.providers.Web3Provider;

export const useWalletProvider: () => WalletState = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [ethereum, setEthereum] = useState<Web3Instance>((undefined as any) as Web3Instance);

  useEffect(() => {
    const provider = (window as any).ethereum as Web3Instance;
    if (!provider) {
      return () => {}; // no-op
    }
    const handler = (accounts: string[]) => {
      setSelectedAccount(accounts[0] ?? '');
    };
    provider.on('accountsChanged', handler);
    return () => {
      provider.removeListener('accountsChanged', handler);
    };
  }, []);

  async function initializeConnectionWithWallet() {
    const win = window as any;
    if (ethereum) {
      if (!selectedAccount) {
        const accounts = await win.ethereum.request({ method: 'eth_requestAccounts' });
        setSelectedAccount(accounts[0]);
      }
      return;
    }
    if (win.ethereum) {
      win.web3 = new ethers.providers.Web3Provider(win.ethereum);
      setEthereum(win.web3);
      const accounts = await win.ethereum.request({ method: 'eth_requestAccounts' });
      setSelectedAccount(accounts[0]);
    } else if (win.web3) {
      win.web3 = new ethers.providers.Web3Provider(win.web3.currentProvider);
      setEthereum(win.web3);
    } else {
      toast.error('No Ethereum wallet detected. Please install MetaMask browser extension');
    }
  }
  return { account: selectedAccount, setAccount: setSelectedAccount, initConnection: initializeConnectionWithWallet, ethereum };
};

const WalletConnector: React.FC = ({}) => {
  const { initConnection, account } = useContext(WalletContext);
  const { networkId } = useContext(VotrContractsContext);
  return (
    <Connector errorBorder={isNetworkSupported(networkId?.toString() ?? '')} onClick={() => initConnection()}>
      {account ? shortenAddress(account) : 'CONNECT'}
    </Connector>
  );
};

export default WalletConnector;
