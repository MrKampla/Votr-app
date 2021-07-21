export default function shortenAddress(address: string = ''): string {
  return `${address.substr(0, 6)}...${address.slice(-4)}`;
}
