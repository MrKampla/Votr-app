import Web3 from "web3";

interface ContractOptions {
    from?: string;
    gasPrice?: string;
    gas?: number;
    data?: string;
}

function createContract<T>(ethereum: Web3, jsonInterface: any, address?: string, options?: ContractOptions) {
    return new ethereum.eth.Contract(jsonInterface, address, options) as unknown as T;
}

export default createContract;