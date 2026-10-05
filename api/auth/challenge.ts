import { createHmac, randomBytes } from 'node:crypto'

const secret = process.env.AUTH_CHALLENGE_SECRET

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  if (!secret) return res.status(503).json({ error: 'Authentication is not configured' })
  const address = String(req.query.address || '').toLowerCase()
  const chainId = Number(req.query.chainId)
  if (!/^0x[a-f0-9]{40}$/.test(address) || !Number.isSafeInteger(chainId) || chainId <= 0) return res.status(400).json({ error: 'Invalid wallet context' })
  const nonce = randomBytes(16).toString('hex')
  const expiresAt = Date.now() + 5 * 60 * 1000
  const origin = String(req.headers.origin || `https://${req.headers.host}`)
  const payload = `${address}|${chainId}|${nonce}|${expiresAt}|${origin}`
  const proof = createHmac('sha256', secret).update(payload).digest('hex')
  const challenge = `Symbiont wallet authentication\n\nAddress: ${address}\nChain ID: ${chainId}\nOrigin: ${origin}\nNonce: ${nonce}\nExpires: ${new Date(expiresAt).toISOString()}\nProof: ${proof}\n\nSigning this message proves wallet control. It does not authorize a blockchain transaction.`
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json({ challenge, expiresAt })
}
