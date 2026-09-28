import { useAccount } from 'wagmi'
export default function ConnectInfo() {
  const { address, chain, isConnected, isConnecting } = useAccount()
  const label = isConnecting ? 'Connecting…' : isConnected ? 'Connected' : 'Not connected'
  return <div className="wallet-status" aria-live="polite">
    <div className="wallet-status-top"><span className="muted-label">CURRENT STATUS</span><span className={isConnected ? 'status connected' : 'status'}><span className="status-dot"/>{label}</span></div>
    <div className="wallet-symbol" aria-hidden="true">◇</div>
    <span className="muted-label">WALLET ADDRESS</span>
    <div className="address">{address || 'Connect a wallet to get started'}</div>
    <div className="network-label">NETWORK <strong>{chain?.name || 'Not selected'}</strong></div>
  </div>
}
