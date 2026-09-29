import './App.css'
import Buttons from './components/Buttons'
import ConnectInfo from './components/ConnectInfo'
import Sign from './components/Sign'

function App() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Symbiont home"><span className="brand-icon">S</span><span>symbiont<span className="brand-accent">.</span></span></a>
        <span className="environment"><span className="live-dot" /> Web3 wallet</span>
      </header>

      <section className="hero" id="home">
        <div className="eyebrow">YOUR WEB3 SPACE <span> / WALLET STUDIO</span></div>
        <h1>Welcome to <span>Symbiont.</span></h1>
        <p>Connect your wallet, manage your network and sign messages securely in one place.</p>
        <div className="hero-pills"><span>Ethereum</span><span>Arbitrum</span><span>Non-custodial demo</span></div>
      </section>

      <section className="dashboard" aria-label="Wallet workspace">
        <div className="workspace" id="wallet">
          <div className="section-heading"><div><span className="step">YOUR WALLET</span><h2>Wallet overview</h2></div><span className="section-mark" aria-hidden="true">◈</span></div>
          <p className="section-description">Connect a supported wallet and choose your preferred network.</p>
          <ConnectInfo />
          <Buttons />
        </div>
        <div className="workspace" id="sign">
          <div className="section-heading"><div><span className="step">SECURE ACTIONS</span><h2>Sign a message</h2></div><span className="section-mark" aria-hidden="true">✳</span></div>
          <p className="section-description">Approve a cryptographic signature. No transaction is submitted.</p>
          <Sign />
        </div>
      </section>

      <aside className="notice" id="security"><span className="notice-icon">ⓘ</span><div><strong>Demo mode · Your keys stay yours</strong><p>Signatures are displayed locally. Production authentication requires a unique server-generated challenge and backend verification. Never share your private keys or seed phrase.</p></div></aside>
      <footer><span>SYMBIONT / WEB3 LAB</span><span>Built with React, Wagmi & Web3Modal</span></footer>
      <nav className="mobile-tabbar" aria-label="App navigation">
        <a href="#home"><span aria-hidden="true">⌂</span><small>Home</small></a>
        <a href="#wallet"><span aria-hidden="true">◈</span><small>Wallet</small></a>
        <a href="#sign"><span aria-hidden="true">✳</span><small>Sign</small></a>
        <a href="#security"><span aria-hidden="true">ⓘ</span><small>Security</small></a>
      </nav>
    </main>
  )
}
export default App
