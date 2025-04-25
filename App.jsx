import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

const tabs = ['Buy', 'About', 'Activities', 'Team', 'FAQ'];

const newsItems = [
  {
    title: 'Negotiations in Dubai were successful!',
    image: '/images/dubai.jpg',
    description: 'Our team successfully concluded strategic talks in Dubai, opening the way for global collaboration.'
  },
  {
    title: '62% of tokens sold!',
    image: '/images/sold.jpg',
    description: 'Community support is overwhelming — over half of ZCT tokens are already in trusted hands.'
  },
  {
    title: 'Launching on BNB soon!',
    image: '/images/bnb.jpg',
    description: 'We’re finalizing technical integrations to launch ZCT on Binance Smart Chain for faster transactions.'
  },
  {
    title: 'First school project funded',
    image: '/images/school.jpg',
    description: 'Thanks to your support, we’ve fully funded a school project that will impact hundreds of children.'
  }
];


export default function App() {
  const [active, setActive] = useState('Buy');
  const activityRefs = useRef([]);

  const handleNewsClick = (index) => {
    setActive('Activities');
    setTimeout(() => {
      activityRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    activityRefs.current = activityRefs.current.slice(0, newsItems.length);
    }, []);

  const [priceUSD, setPriceUSD] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getTokenPriceInUSD();
      setPriceUSD(price.toFixed(4));
    };

    fetchPrice();
  }, []);


  return (
    <>
    <header className="header-bar">
      <img src="/images/2.png" alt="ZCT Logo" />
      <h1>Zakat Charity Token</h1>
    </header>

    
      <div className="news-wrapper">
  <div className="news-ticker centered">
    {newsItems.slice(0, 4).map((item, idx) => (
      <div
        className="news-item"
        key={idx}
        onClick={() => handleNewsClick(idx)}
      >
        <img src={item.image} alt="news" />
        <div>
          <h4>{item.title}</h4>
          <p>Click to learn more</p>
        </div>
      </div>
    ))}
  </div>
</div>

      <nav>
        {tabs.map(tab => (
          <button
            key={tab}
            className={active === tab ? 'active' : ''}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="container">
        {active === 'Buy' && (
          <div className="card">
            <h2>Presale is Live</h2>
            <p>1 ZCT ≈ {priceUSD ? `$${priceUSD}` : 'Loading...'} USD</p>
            <button className="buy-btn">Buy Tokens</button>
          </div>
        )}

        {active === 'About' && (
          <div className="card">
            <h2>About ZCT</h2>
            <p>Zakat Charity Token (ZCT) brings transparency to charity through blockchain.</p>
          </div>
        )}

        {active === 'Activities' && (
          <div className="card">
            <h2>Our Activities</h2>
            <div className="activities">
            {newsItems.slice(0, 4).map((item, idx) => (
              <div key={idx} className="activity-box" ref={el => activityRefs.current[idx] = el}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}

            </div>
          </div>
        )}

        {active === 'Team' && (
          <div className="card">
            <h2>Our Team</h2>
            <ul>
              <li>X — Founder</li>
              <li>X — Blockchain Dev</li>
              <li>X — Ops Lead</li>
              <li>X — Charity Outreach</li>
            </ul>
          </div>
        )}

        {active === 'FAQ' && (
          <div className="card">
            <h2>FAQ</h2>
            <ul>
              <li><strong>How to buy?</strong> Connect your wallet and click 'Buy Tokens'.</li>
              <li><strong>Funds usage?</strong> 100% go to verified charities.</li>
              <li><strong>Blockchain?</strong> ZCT is on Solana, soon moving to BNB.</li>
            </ul>
          </div>
        )}
      </div>

      <footer>
        <p>📧 Contact: support@zct.org | 📱 Telegram: @zakat_token | 🌍 www.zakatdao.com</p>
        <p>&copy; 2025 Zakat Charity Token. All rights reserved.</p>
      </footer>
    </>
  );
}
