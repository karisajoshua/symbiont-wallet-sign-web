import { useAccount } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

export default function ConnectInfo() {
  const { address, chain, isConnected, isConnecting, isReconnecting, isDisconnected } = useAccount()
  const supported = !isConnected || chain?.id === mainnet.id || chain?.id === arbitrum.id
  const label = isConnecting || isReconnecting ? 'Connecting…' : isConnected ? supported ? 'Connected' : 'Unsupported network' : isDisconnected ? 'Not connected' : 'Checking connection'
  return <div className="wallet-status" aria-live="polite">
    <div className="wallet-status-top"><span className="muted-label">CURRENT STATUS</span><span className={isConnected && supported ? 'status connected' : !supported ? 'status warning' : 'status'}><span className="status-dot" aria-hidden="true"/>{label}</span></div>
    <div className="wallet-symbol" aria-hidden="true">◇</div>
    <span className="muted-label">WALLET ADDRESS</span>
    <div className="address">{address || 'Connect your wallet to begin'}</div>
    <div className="network-label"><span>ACTIVE NETWORK</span><strong>{chain?.name || 'Not selected'}</strong></div>
    {!supported && <p className="inline-alert" role="alert">This network is not supported. Select Ethereum or Arbitrum to sign.</p>}
  </div>
}
