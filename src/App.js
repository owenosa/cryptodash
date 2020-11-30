import React, {useState, useEffect} from 'react';
import Header from './Header';
import SideBar from './Sidebar';
import BalanceBox from './BalanceBox';
import SmallBox from './SmallBox';
import LongBox from './LongBox';
import HorzBox from './HorzBox';
import LargeBox from './LargeBox';
import AssetsBox from './AssetsBox';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true)
  const [smallData, setSmallData] = useState({})
  const [currentBalance, setCurrentBalance] = useState(50000)
  const [bitcoinAssets, setBitcoinAssets] = useState(0)
  const [ethereumAssets, setEthereumAssets] = useState(0)
  const [stellarAssets, setStellarAssets] = useState(0)
  const [tetherAssets, setTetherAssets] = useState(0)

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then(response => response.json())
    .then(data => {
      setSmallData(data)
      setLoading(false)
    })
  },[]);

  return (
    <div className="app">

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="app"> 
          {/* Header */}
          <Header />
          
          {/* Left SideBar */}
          <SideBar />
          
          {/* BalanceBox - Balance */ }
          <BalanceBox className="balance" 
            id="balance"
            currentPrice={currentBalance}
            color= "#2ea7e0"
            title="Balance"
            image={smallData[29].image}
            />
          
          {/* SmallBox - Bitcoin */}
          <SmallBox className="bitcoin" 
            id={smallData[0].id}
            symbol={smallData[0].symbol}
            currentPrice={smallData[0].current_price}
            color= "#f7931a"
            title={smallData[0].name}
            image={smallData[0].image}
          />
          
          {/* SmallBox - ethereum */}
          <SmallBox className="ethereum" 
            id={smallData[1].id}
            symbol={smallData[1].symbol}
            currentPrice={smallData[1].current_price}
            color= "#62688f"
            title={smallData[1].name}
            image={smallData[1].image} 
          />
          
          {/* SmallBox - stellar */}
          <SmallBox className="stellar" 
            id={smallData[10].id}
            symbol={smallData[10].symbol}
            currentPrice={smallData[10].current_price}
            color= "black"
            title={smallData[10].name}
            image={smallData[10].image} 
          />
          
          {/* SmallBox - tether */}
          <SmallBox className="tether" 
            id={smallData[3].id}
            symbol={smallData[3].symbol}
            currentPrice={smallData[3].current_price}
            color= "#03ac84"
            title={smallData[3].name}
            image={smallData[3].image} 
          />
          
          {/* LongBox - Recent Operations */}
          <LongBox />
          
          {/* HorizontalBox - Buy/Sell Coins */}
          <HorzBox 
          currentBalance= "10,000"
          bitcoinPrice={smallData[0].current_price}
          ethereumPrice={smallData[1].current_price}
          stellarPrice={smallData[10].current_price}
          tetherPrice={smallData[3].current_price}
          setCurrentBalance={setCurrentBalance}
          currentBalance={currentBalance}
          setBitcoinAssets={setBitcoinAssets}
          setEthereumAssets={setEthereumAssets}
          setStellarAssets={setStellarAssets}
          setTetherAssets={setTetherAssets}
          bitcoinAssets={bitcoinAssets}
          ethereumAssets={ethereumAssets}
          stellarAssets={stellarAssets}
          tetherAssets={tetherAssets}
          />

          {/* LargeBox - Graph (BTC) */}
          <LargeBox />

          {/* AssetBox - Assets*/}
          <AssetsBox 
            data={smallData}
            bitcoinAssets={bitcoinAssets}
            ethereumAssets={ethereumAssets}
            stellarAssets={stellarAssets}
            tetherAssets={tetherAssets}
            />
        </div>
      )}
      
    </div>
  );
}

export default App;
