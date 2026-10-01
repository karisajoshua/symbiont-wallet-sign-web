# Symbiont Wallet Sign — UI/UX Design System v1
Status: Proposal only. No application source code changes.
Scope: wallet connection and message-signing demonstration. Do not describe it as production authentication.

## Design principles
- Trust through clarity: explain exactly what a wallet connection and signature do, and do not imply a signature is a login.
- Calm, premium Web3: retain navy/mint rather than copying Texcortech's brand.
- Progressive disclosure: connect first, review message second, sign third, inspect/copy result last.
- Responsive and accessible by default. Honor reduced motion.

## Tokens
- Canvas: #080E1A; surface: #121E2E; raised: #172638; inset: #0A1421.
- Primary mint: #65E7C9; mint hover: #A0F2DD; text: #F1F5FF; muted: #A8B8C8.
- Border: #29394A; focus: #76E9CB; error: #FF9C9C; success: #63E7C4.
- Use semantic token names, not scattered hardcoded colors.
- Typography: system-first Inter fallback (load a licensed font only if needed); 12/14/16/18/24/36/56 responsive scale. Body >= 14px; helper text >= 12px and check contrast.
- Spacing: 4px base with 8/12/16/24/32/48/64; panel radius 20px, control radius 12px; visible focus ring >= 2px.

## Page composition
Desktop: restrained topbar; hero with short value statement; two-column Connect / Sign workspace; persistent demonstration disclaimer below. Mobile: one-column sequential flow with connection step preceding signing, readable wallet address, full-width actions and no horizontal overflow.
- Topbar: replace generic S placeholder with approved Symbiont mark only when supplied; environment label must not imply live network status.
- Connection panel: disconnected, connecting, connected, wrong/unsupported network, rejected/error, disconnect states.
- Signing panel: message preview with exact signed text, wallet approval pending, rejected/error, success with signature and copy confirmation. Disable signing while disconnected or pending. Clear stale signature and error when wallet or chain changes.
- Security disclaimer: signing a demo message is not SIWE authentication; never request keys or seed phrases.
- Footer: correct technology attribution and optional docs/repository links.

## Component contract
AppShell, Topbar, Hero, StepCard, StatusBadge, WalletAddress, NetworkBadge, PrimaryButton, SecondaryButton, MessagePreview, SignatureResult, InlineAlert, SecurityNotice.
Each interactive component should define hover/focus/disabled/pending/success/error states. Use semantic elements and live regions for asynchronous results.

## Interaction rules
- Connection: show loading; preserve provider modal behavior; explicit feedback for errors and cancellation.
- Network: validate against configured mainnet and arbitrum; do not allow unsupported-network signing.
- Signing: never change the signed text invisibly; show message clearly before approval; show locally returned signature without treating it as authentication.
- Clipboard: confirm success; catch permission/availability errors and provide selectable text fallback.
- No unrequested on-chain transactions, wallet custody, backend changes or payment integration.

## Responsive and motion
At 320px, 375px, 768px, 1024px and wide desktop, verify navigation, content, focus, card padding, and long wallet addresses. Prefer transform/opacity transitions <= 250ms, and disable decorative motion under prefers-reduced-motion.

## Verification before merge
1. Confirm current build/lint baseline.
2. Implement in small commits on design branch only.
3. Verify connect/disconnect, both networks, rejection, pending, signing success/error, clipboard, and responsive views.
4. Add unit/component tests for state handling and end-to-end wallet mocking as feasible.
5. Audit dependencies and SIWE requirements separately if production authentication is requested.

## Known issues from initial static audit
- index.html still uses Vite title/favicon.
- Wallet metadata icon points to GitHub avatar.
- Fixed demo signing message; no backend nonce/verification/session.
- Clipboard operation has no error/success feedback.
- No configured automated test scripts in package.json.
- CSS is monolithic and hardcoded; tokenize incrementally rather than rewriting unrelated code.

## Approval boundary
This document is a proposal. Do not alter existing UI, wallet configuration, security logic, or deployment until design is reviewed.
