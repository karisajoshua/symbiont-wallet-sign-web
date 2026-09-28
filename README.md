# Symbiont Wallet Sign Web

A React + TypeScript demonstration of connecting a cryptocurrency wallet and signing a message using Wagmi and Web3Modal.

> **Demonstration only:** This app does not implement backend authentication, on-chain transactions, wallet custody, or production-grade identity verification.

## Features

- Connect and disconnect supported wallets using Web3Modal.
- Select Ethereum Mainnet or Arbitrum.
- View connection state and public wallet address.
- Sign a demonstration message and display its signature or an error.

## Technology

React 18, TypeScript, Vite 5, Wagmi 2, Web3Modal 5, and TanStack Query.

## Getting started

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local`.
3. Create your own WalletConnect project at https://cloud.reown.com/ and set `VITE_WALLETCONNECT_PROJECT_ID` in `.env.local`.
4. Start development: `npm run dev`.
5. Run `npm run build` and `npm run lint` before deploying.

The WalletConnect project ID is a **public client identifier**, not a secret. Restrict allowed origins in your WalletConnect dashboard and never put private keys or server credentials in `VITE_` variables.

## Security and scope

Message signing proves control of a wallet for a particular message, but **displaying a signature alone is not authentication**. A real sign-in flow needs a server-generated, single-use nonce, a domain-bound structured message (e.g., SIWE / EIP-4361), server-side signature verification, expiration, replay protection, and session management. Never ask users for seed phrases or private keys.

This project currently has no backend signature verifier or payment flow. Avoid signing unfamiliar messages. Confirm dependencies and test on supported wallets before production use.

## Roadmap

- [ ] Add a polished, accessible and mobile-friendly wallet interface.
- [ ] Add SIWE with backend verification, nonce expiry, and replay prevention.
- [ ] Add component, integration and end-to-end tests.
- [ ] Review and update dependencies and configure automated security checks.
- [ ] Deploy a documented live demo after validation.

## Attribution

Forked from [SpotAdev's Symbiont Wallet Sign Web](https://github.com/spotadev/symbiont-wallet-sign-web). Review upstream rights and dependencies before commercial redistribution.
