import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

type Challenge = { challenge: string; expiresAt: number }
type Session = { address: string; authenticatedAt: number }

export default function Authenticate() {
  const { address, chain, isConnected } = useAccount()
  const { signMessageAsync, isPending } = useSignMessage()
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { setSession(null); setStatus(''); setError('') }, [address, chain?.id])

  async function authenticate() {
    if (!address || !chain) return
    setError(''); setStatus('Requesting a one-time challenge…')
    try {
      const challengeResponse = await fetch(`/api/auth/challenge?address=${encodeURIComponent(address)}&chainId=${chain.id}`, { cache: 'no-store' })
      if (!challengeResponse.ok) throw new Error('Could not create an authentication challenge.')
      const challenge = await challengeResponse.json() as Challenge
      setStatus('Approve the authentication message in your wallet…')
      const signature = await signMessageAsync({ message: challenge.challenge })
      setStatus('Verifying your signature…')
      const verifyResponse = await fetch('/api/auth/verify', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ address, chainId: chain.id, challenge: challenge.challenge, expiresAt: challenge.expiresAt, signature }) })
      const result = await verifyResponse.json() as { ok?: boolean; address?: string; authenticatedAt?: number; error?: string }
      if (!verifyResponse.ok || !result.ok || !result.address || !result.authenticatedAt) throw new Error(result.error || 'Signature verification failed.')
      setSession({ address: result.address, authenticatedAt: result.authenticatedAt })
      setStatus('Wallet authenticated')
    } catch (err) {
      setStatus('')
      setError(err instanceof Error ? err.message : 'Authentication failed.')
    }
  }

  return <div className="auth-panel">
    <div className="auth-state"><span className="muted-label">AUTHENTICATION</span><strong>{session ? 'Verified wallet' : 'Not authenticated'}</strong><small>{session ? `${session.address.slice(0, 8)}…${session.address.slice(-6)}` : 'Prove control of your connected wallet with a short-lived challenge.'}</small></div>
    <button className="button-primary sign-button" type="button" disabled={!isConnected || isPending || Boolean(session)} onClick={() => void authenticate()}>{isPending ? 'Awaiting wallet…' : session ? 'Authenticated ✓' : 'Authenticate wallet'} <span aria-hidden="true">↗</span></button>
    {status && <p className="helper" role="status">{status}</p>}
    {error && <p className="error" role="alert">{error}</p>}
    <p className="auth-note">Authentication signs a message only. It does not submit a blockchain transaction or expose your private key.</p>
  </div>
}
