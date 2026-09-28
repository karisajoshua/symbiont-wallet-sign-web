import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

export default function Buttons() {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  return <div className="button-row">
    <button className="button-primary" type="button" onClick={() => open()}>{isConnected ? 'Manage wallet' : 'Connect wallet'} <span aria-hidden="true">↗</span></button>
    <button className="button-secondary" type="button" onClick={() => open({ view: 'Networks' })}>Select network</button>
  </div>
}
