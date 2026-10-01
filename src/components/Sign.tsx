import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

const message = 'Symbiont Rocks'

export default function Sign() {
  const { address, chain, isConnected } = useAccount()
  const supported = chain?.id === mainnet.id || chain?.id === arbitrum.id
  const { data, error, isPending, isSuccess, signMessage, reset } = useSignMessage()
  const [copyStatus, setCopyStatus] = useState('')
  useEffect(() => {
    reset()
    setCopyStatus('')
  }, [address, chain?.id, reset])
  const canSign = isConnected && supported && !isPending
  async function copySignature(signature: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(signature)
      setCopyStatus('Signature copied')
    } catch {
      setCopyStatus('Could not copy automatically. Select and copy the signature above.')
    }
  }
  return <div className="sign-content">
    <div className="message-preview"><span className="muted-label">EXACT MESSAGE TO SIGN</span><div>{message}</div><span className="preview-hint">Confirm this exact message in your wallet before approving.</span></div>
    <button className="button-primary sign-button" type="button" disabled={!canSign} aria-busy={isPending} onClick={() => { setCopyStatus(''); reset(); signMessage({ message }) }}>{isPending ? 'Awaiting wallet approval…' : 'Sign message'} <span aria-hidden="true">↗</span></button>
    {!isConnected && <p className="helper">Connect your wallet first to enable signing.</p>}
    {isConnected && !supported && <p className="inline-alert" role="alert">Switch to Ethereum or Arbitrum before signing.</p>}
    {isPending && <p className="helper" role="status">Review the request in your wallet. You can reject it there.</p>}
    {error && <p className="error" role="alert">{error.message || 'Unable to sign the message.'}</p>}
    {isSuccess && data && isConnected && supported && <div className="signature-result"><span className="muted-label">YOUR DEMO SIGNATURE</span><code>{data}</code><button className="copy-button" type="button" onClick={() => void copySignature(data)}>Copy signature</button><p className="helper" role="status">{copyStatus}</p></div>}
  </div>
}
