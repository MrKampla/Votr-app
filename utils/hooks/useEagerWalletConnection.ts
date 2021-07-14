import { useEffect } from 'react';
import { WalletState } from '../../components/providers/WalletConnector';

export const useEagerWalletConnection = (wallet: WalletState) => {
  useEffect(() => {
    wallet.initConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
