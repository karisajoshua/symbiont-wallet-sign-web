import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
if (!projectId) {
  throw new Error('Missing VITE_WALLETCONNECT_PROJECT_ID. Copy .env.example to .env.local and configure WalletConnect.')
}

const metadata = {
  name: 'Symbiont Wallet Sign',
  description: 'A wallet connection and message-signing demonstration',
  url: window.location.origin,
  icons: [`https://github.com/karisajoshua.png`]
}

const chains = [mainnet, arbitrum] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    showWallets: true,
    walletFeatures: true
  }
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: false
})

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
