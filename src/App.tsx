import './App.css'
import Buttons from './components/Buttons'
import ConnectInfo from './components/ConnectInfo'
import Sign from './components/Sign'

function App() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Symbiont home"><span className="brand-icon">S</span><span>symbiont<span className="brand-accent">.</span></span></a>
        <span className="environment"><span className="live-dot" /> Web3 playground</span>
      </header>

      <section className="hero">
        <div className="eyebrow">WALLET CONNECTION STUDIO <span> / 01</span></div>
        <h1>Your wallet.<br/><span>Your signature.</span></h1>
        <p>Explore wallet connectivity and cryptographic message signing in one simple, transparent workspace.</p>
        <div className="hero-pills"><span>Ethereum</span><span>Arbitrum</span><span>Non-custodial demo</span></div>
      </section>

      <section className="dashboard" aria-label="Wallet workspace">
        <div className="workspace">
          <div className="section-heading"><div><span className="step">01 / CONNECT</span><h2>Wallet connection</h2></div><span className="section-mark">↗</span></div>
          <p className="section-description">Connect a supported wallet and choose your preferred network.</p>
          <ConnectInfo />
          <Buttons />
        </div>
        <div className="workspace">
          <div className="section-heading"><div><span className="step">02 / SIGN</span><h2>Message signing</h2></div><span className="section-mark">✳</span></div>
          <p className="section-description">Request a signature from your connected wallet. No transaction is submitted.</p>
          <Sign />
        </div>
      </section>

      <aside className="notice"><span className="notice-icon">ⓘ</span><div><strong>A demonstration, not a login service.</strong><p>Signatures are displayed locally. Production authentication requires a unique server-generated challenge and backend signature verification. Never share your private keys or seed phrase.</p></div></aside>
      <footer><span>SYMBIONT / WEB3 LAB</span><span>Built with React, Wagmi & Web3Modal</span></footer>
    </main>
  )
}
export default App
