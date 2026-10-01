import './App.css'
import Buttons from './components/Buttons'
import ConnectInfo from './components/ConnectInfo'
import Sign from './components/Sign'

export default function App() {
  return <div className="site">
    <header className="topbar shell">
      <a className="brand" href="/" aria-label="Symbiont home"><span className="brand-icon" aria-hidden="true">S</span><span>symbiont<span className="brand-accent">.</span></span></a>
      <span className="environment"><span className="status-dot" aria-hidden="true" /> Wallet signing demo</span>
    </header>
    <main className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow">SYMBIONT STUDIO <span>/ WALLET EXPERIENCE</span></div>
        <h1 id="hero-title">Your wallet.<br/><span>Your signature.</span></h1>
        <p>Connect a wallet, review a message and explore cryptographic signing in a transparent workspace.</p>
        <div className="hero-pills" aria-label="Supported networks and application scope"><span>Ethereum</span><span>Arbitrum</span><span>Non-custodial demo</span></div>
      </section>
      <div className="journey" aria-label="How it works"><span><b>01</b> Connect wallet</span><span aria-hidden="true">→</span><span><b>02</b> Review message</span><span aria-hidden="true">→</span><span><b>03</b> Sign securely</span></div>
      <section className="dashboard" aria-label="Wallet workspace">
        <article className="workspace">
          <div className="section-heading"><div><span className="step">STEP 01 / CONNECT</span><h2>Wallet connection</h2></div><span className="section-mark" aria-hidden="true">↗</span></div>
          <p className="section-description">Connect a supported wallet and confirm your active network.</p>
          <ConnectInfo /><Buttons />
        </article>
        <article className="workspace">
          <div className="section-heading"><div><span className="step">STEP 02 / REVIEW & SIGN</span><h2>Message signing</h2></div><span className="section-mark" aria-hidden="true">✳</span></div>
          <p className="section-description">Review the exact message before approving in your wallet. No transaction is submitted.</p>
          <Sign />
        </article>
      </section>
      <aside className="notice"><span className="notice-icon" aria-hidden="true">ⓘ</span><div><strong>This is a demonstration, not a login service.</strong><p>A signature is displayed locally; it does not authenticate you to Symbiont. Production login requires a server-generated challenge and backend verification. Never share private keys or seed phrases.</p></div></aside>
    </main>
    <footer className="shell"><span>© SYMBIONT / WEB3 LAB</span><span>React · Wagmi · Web3Modal</span></footer>
  </div>
}
