export default function Home() {
  return (
    <main>
      <div className="hero">
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <rect width="80" height="80" rx="16" fill="#f59e0b"/>
          <text x="40" y="55" text-anchor="middle" fontSize="40" fontWeight="bold" fill="#000">₿</text>
        </svg>
        <h1>x402 Crypto APIs</h1>
        <p>Premium cryptocurrency data, news, and tools. Pay per request with USDC micropayments.</p>
      </div>
      <div className="grid">
        <div className="card"><h3>/api/crypto-news</h3><p>Host: cryptocurrency-news2</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/crypto-news51</h3><p>Host: crypto-news51</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/crypto-news16</h3><p>Host: crypto-news16</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/crypto-news54</h3><p>Host: crypto-news54</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/password-gen</h3><p>Host: password-generator-api-apiverve</p><p className="price">$0.050</p></div>
        <div className="card"><h3>/api/apiton</h3><p>Host: apiton</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/crypto-exchange</h3><p>Host: real-time-crypto-exchange</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/screener-official</h3><p>Host: crypto-screener-official</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/screener</h3><p>Host: crypto-screener</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/coinbase-realtime</h3><p>Host: coinbase-crypto-realtime-data</p><p className="price">$0.125</p></div>
        <div className="card"><h3>/api/coinbase</h3><p>Host: coinbase-crypto</p><p className="price">$0.125</p></div>
        <div className="card"><h3>/api/wallet-validator</h3><p>Host: crypto-wallet-address-validator1</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/crypto-list</h3><p>Host: fetches-cryptocurrencies-list1</p><p className="price">$0.075</p></div>
        <div className="card"><h3>/api/chaincheck</h3><p>Host: chaincheck</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/ton-fragment</h3><p>Host: ton-fragment</p><p className="price">$0.100</p></div>
        <div className="card"><h3>/api/cryptography</h3><p>Host: cryptography-apis</p><p className="price">$0.075</p></div>
      </div>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0a; color: #e5e5e5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .hero { text-align: center; padding: 4rem 2rem; }
        .logo { width: 80px; height: 80px; margin-bottom: 1.5rem; }
        .hero h1 { font-size: 3rem; background: linear-gradient(135deg, #f59e0b, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; color: #999; max-width: 600px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .card { background: #141414; border: 1px solid #262626; border-radius: 12px; padding: 1.5rem; transition: border-color 0.2s; }
        .card:hover { border-color: #f59e0b; }
        .card h3 { color: #f59e0b; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .card p { color: #888; font-size: 0.9rem; margin-bottom: 0.25rem; }
        .card .price { color: #22c55e; font-weight: bold; font-size: 1rem; }
      `}</style>
    </main>
  );
}
