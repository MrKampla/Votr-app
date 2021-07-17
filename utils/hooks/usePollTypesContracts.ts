import { useContext, useEffect, useState } from 'react';
import { PollType, getPollTypeContractsForNetwork } from '../../constants/pollTypes';
import { WalletContext } from '../../components/providers/WalletConnector';
import { isNetworkSupported } from '../isNetworkSupported';

export const usePollTypesContracts = () => {
  const { ethereum } = useContext(WalletContext);
  const [pollTypes, setPollTypes] = useState<PollType[]>([]);

  useEffect(() => {
    if (!ethereum) return;
    async function getPolls() {
      const networkId = (await ethereum.getNetwork()).chainId;
      if (!isNetworkSupported(networkId.toString())) {
        return;
      }
      const fetchedPollTypes = getPollTypeContractsForNetwork(networkId.toString());
      setPollTypes(fetchedPollTypes);
    }
    getPolls();
  }, [ethereum]);
  return pollTypes;
};
