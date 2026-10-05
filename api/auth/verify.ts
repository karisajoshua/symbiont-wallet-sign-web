import { createHmac, timingSafeEqual } from 'node:crypto'
import { verifyMessage } from 'viem'
const secret = process.env.AUTH_CHALLENGE_SECRET
function parseChallenge(challenge: string) {
  return Object.fromEntries(challenge.split('\n').filter(line => line.includes(': ')).map(line => {
    const index = line.indexOf(': ')
    return [line.slice(0, index), line.slice(index + 2)]
  }))
}
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!secret) return res.status(503).json({ error: 'Authentication is not configured' })
  const { address, chainId, challenge, expiresAt, signature } = req.body || {}
  if (typeof challenge !== 'string' || typeof signature !== 'string' || typeof address !== 'string') return res.status(400).json({ error: 'Invalid authentication request' })
  const fields = parseChallenge(challenge)
  const normalized = address.toLowerCase()
  const requestOrigin = String(req.headers.origin || `https://${req.headers.host}`)
  if (fields.Address !== normalized || Number(fields['Chain ID']) !== Number(chainId) || fields.Origin !== requestOrigin || Number(expiresAt) < Date.now() || fields.Expires !== new Date(Number(expiresAt)).toISOString()) return res.status(401).json({ error: 'Challenge is invalid or expired' })
  const payload = `${normalized}|${Number(chainId)}|${fields.Nonce}|${Number(expiresAt)}|${fields.Origin}`
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  const actual = fields.Proof || ''
  if (expected.length !== actual.length || !timingSafeEqual(Buffer.from(expected), Buffer.from(actual))) return res.status(401).json({ error: 'Challenge proof is invalid' })
  const valid = await verifyMessage({ address: normalized as `0x${string}`, message: challenge, signature: signature as `0x${string}` })
  if (!valid) return res.status(401).json({ error: 'Signature does not match this wallet' })
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json({ ok: true, address: normalized, authenticatedAt: Date.now() })
}
