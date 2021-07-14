import { useContext, useEffect, useState } from 'react';
import { PollType, getPollTypeContractsForNetwork } from '../../constants/pollTypes';
import { WalletContext } from '../../components/providers/WalletConnector';

export const usePollTypesContracts = () => {
  const { ethereum } = useContext(WalletContext);
  const [pollTypes, setPollTypes] = useState<PollType[]>([]);

  useEffect(() => {
    if (!ethereum) return;
    async function getPolls() {
      const networkId = await ethereum.eth.net.getId();
      const fetchedPollTypes = getPollTypeContractsForNetwork(networkId.toString());
      setPollTypes(fetchedPollTypes);
    }
    getPolls();
  }, [ethereum]);
  return pollTypes;
};
