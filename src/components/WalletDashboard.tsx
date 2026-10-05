import { useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'

export default function WalletDashboard() {
  const { address, chain, isConnected } = useAccount()
  const { data: balance, isLoading } = useBalance({ address, query: { enabled: Boolean(address) } })
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (!address) return
    await navigator.clipboard.writeText(address)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const shortAddress = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : '—'
  const nativeBalance = balance ? Number(formatEther(balance.value)).toLocaleString(undefined, { maximumFractionDigits: 5 }) : '—'

  return <section className="wallet-dashboard" aria-labelledby="wallet-overview-title">
    <div className="dashboard-title">
      <div><span className="step">WALLET OVERVIEW</span><h2 id="wallet-overview-title">Your Web3 workspace</h2></div>
      <span className={isConnected ? 'status connected' : 'status'}><span className="status-dot" aria-hidden="true"/>{isConnected ? 'Live' : 'Offline'}</span>
    </div>
    <div className="metric-grid">
      <article className="metric-card"><span className="muted-label">ACCOUNT</span><strong>{shortAddress}</strong><button type="button" onClick={copyAddress} disabled={!address}>{copied ? 'Copied' : 'Copy address'}</button></article>
      <article className="metric-card"><span className="muted-label">NETWORK</span><strong>{chain?.name || 'Not connected'}</strong><small>Chain ID {chain?.id ?? '—'}</small></article>
      <article className="metric-card"><span className="muted-label">NATIVE BALANCE</span><strong>{isLoading ? 'Loading…' : nativeBalance}</strong><small>{balance?.symbol || 'Connect wallet'}</small></article>
    </div>
    <div className="capability-strip">
      <div><span>01</span><strong>Connect</strong><small>Establish wallet context</small></div>
      <div><span>02</span><strong>Inspect</strong><small>Read account & network</small></div>
      <div><span>03</span><strong>Sign</strong><small>Approve cryptographically</small></div>
      <div><span>04</span><strong>Authorize</strong><small>Production phase next</small></div>
    </div>
  </section>
}
