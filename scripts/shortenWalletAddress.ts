export default function shortenWalletAddress(address: string): string {
    return `${address.substr(0, 6)}...${address.slice(-4)}`
}