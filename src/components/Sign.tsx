import { useAccount, useSignMessage } from 'wagmi'
const message = 'Symbiont Rocks'
export default function Sign() {
  const { isConnected } = useAccount()
  const { data, error, isPending, isSuccess, signMessage } = useSignMessage()
  return <div className="sign-content">
    <div className="message-preview"><span className="muted-label">MESSAGE TO SIGN</span><div>{message}</div><span className="preview-hint">Review the message in your wallet before approving.</span></div>
    <button className="button-primary sign-button" type="button" disabled={!isConnected || isPending} onClick={() => signMessage({ message })}>{isPending ? 'Awaiting wallet approval…' : 'Sign message'} <span aria-hidden="true">↗</span></button>
    {!isConnected && <p className="helper">Connect your wallet first to enable signing.</p>}
    {error && <p className="error" role="alert">{error.message || 'Unable to sign the message.'}</p>}
    {isSuccess && data && <div className="signature-result"><span className="muted-label">SIGNATURE</span><code>{data}</code><button className="copy-button" type="button" onClick={() => navigator.clipboard.writeText(data)}>Copy signature</button></div>}
  </div>
}
