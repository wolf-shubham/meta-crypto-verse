import React from 'react'
import LeftNavbar from '../components/LeftNavbar'

const GlobalCryptoStats = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LeftNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'white',
                    overflowY: 'scroll',
                    paddingLeft: '1rem',
                    paddingTop: '5px'
                }}
            >
                <div className="globalStats">
                    <h2>global crypto stats</h2>
                    {/* <h3>{data.coins.name}</h3> */}
                    <h3>total crypto currencies : 'globalCryptoData.total'</h3>
                    <h3>total crypto exchanges : 'millify(globalCryptoData.totalExchanges)'</h3>
                    <h3>last 24hrs transactions volume : 'millify(globalCryptoData.total24hVolume)'</h3>
                    <h3>total market cap : 'millify(globalCryptoData.totalMarketCap)'</h3>
                </div>
            </div>
        </div>
    )
}

export default GlobalCryptoStats