import React from 'react'
import LeftNavbar from '../Components/LeftNavbar'

const Home = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LeftNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'yellowgreen'
                }}
            >
                <h1>home</h1>
                <div className="globalStats">
                    <h2>global crypto stats</h2>
                    {/* <h3>{data.coins.name}</h3> */}
                    <h3>total crypto currencies : 'globalCryptoData.total'</h3>
                    <h3>total crypto exchanges : 'millify(globalCryptoData.totalExchanges)'</h3>
                    <h3>last 24hrs transactions volume : 'millify(globalCryptoData.total24hVolume)'</h3>
                    <h3>total market cap : 'millify(globalCryptoData.totalMarketCap)'</h3>
                </div>
                <div className="cryptoCurrencies">
                    <h1>Crypto Currencies</h1>
                    {/* <CryptoCurrencies /> */}
                </div>
            </div>
        </div>
    )
}

export default Home