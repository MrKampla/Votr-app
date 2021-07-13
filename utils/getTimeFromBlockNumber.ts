import Web3 from "web3"

export const getTimeFromBlockNumber = async (ethereum: Web3, blockNumber: number) => {
    return (+(await ethereum.eth.getBlock(blockNumber)).timestamp) * 1000;
}
