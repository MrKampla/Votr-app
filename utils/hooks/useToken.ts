import { useState, useEffect, useContext, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from '../../components/providers/WalletConnector';
import ERC20ContractJson from '../../contracts/ERC20.json';
import { ERC20 } from '../../contracts/@types';
import createContract from '../createContract';
import { RequestStatus } from '../../constants/requestStatus';

interface UseTokenBalanceProps {
  tokenAddress: string;
  checkAllowanceFor?: string;
}

function useToken({ tokenAddress, checkAllowanceFor }: UseTokenBalanceProps) {
  const { ethereum, account } = useContext(WalletContext);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [symbol, setSymbol] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [tokenAllowance, setTokenAllowance] = useState('0');

  const refresh = useCallback(async () => {
    async function fetchTokenBalance() {
      if (ethers.utils.isAddress(tokenAddress)) {
        try {
          const customTokenContract = createContract<ERC20>(ethereum, ERC20ContractJson.abi, tokenAddress);
          setTokenBalance((await customTokenContract.balanceOf(account)).toString());
        } catch {
          setTokenBalance('0');
        }
      }
    }
    async function fetchTokenSymbol() {
      if (ethers.utils.isAddress(tokenAddress)) {
        try {
          const customTokenContract = createContract<ERC20>(ethereum, ERC20ContractJson.abi, tokenAddress);
          setSymbol(await customTokenContract.symbol());
        } catch {
          setSymbol('');
        }
      }
    }
    async function fetchTokenAlowance() {
      if (ethers.utils.isAddress(tokenAddress) && checkAllowanceFor) {
        try {
          const customTokenContract = createContract<ERC20>(ethereum, ERC20ContractJson.abi, tokenAddress);
          setTokenAllowance((await customTokenContract.allowance(account, checkAllowanceFor)).toString());
        } catch {
          setTokenAllowance('');
        }
      }
    }
    setStatus('loading');
    Promise.all([fetchTokenBalance(), fetchTokenSymbol(), fetchTokenAlowance()])
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [account, checkAllowanceFor, ethereum, tokenAddress]);

  useEffect(() => {
    refresh();
  }, [account, checkAllowanceFor, ethereum, refresh, tokenAddress]);

  return { tokenBalance, status, symbol, tokenAllowance, refresh };
}

export default useToken;
