/* eslint-disable react/display-name */
import toast from 'react-hot-toast';
import { IoMdOpen } from 'react-icons/io';
import styled from 'styled-components';
import { generateLinkToEtherscan } from './generateLinkToEtherscan';

const TransactionLinkWrapper = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: 0.25;
  color: ${(props) => props.theme.success};
  &:hover {
    text-decoration: underline;
  }
`;

export const generateTransactionToast = async (receiptPromise: Promise<any>, transactionHash: string) => {
  const linkToTransaction = await generateLinkToEtherscan(transactionHash);
  toast.promise(
    receiptPromise,
    {
      loading: (
        <div>
          Transaction in progress... <br />
          <TransactionLinkWrapper href={linkToTransaction} target="_blank" rel="noreferrer">
            Follow a transaction on etherscan: <IoMdOpen />
          </TransactionLinkWrapper>
        </div>
      ),
      success: (
        <div>
          Transaction successful! <br />
          <TransactionLinkWrapper href={linkToTransaction} target="_blank" rel="noreferrer">
            Link to transaction on etherscan: <IoMdOpen />
          </TransactionLinkWrapper>
        </div>
      ),
      error: 'Something went wrong',
    },
    {
      position: 'top-right',
    }
  );
};
