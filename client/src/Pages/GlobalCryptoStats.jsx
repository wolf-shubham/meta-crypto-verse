import React, { useEffect, useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import axios from 'axios'
import millify from 'millify'

const GlobalCryptoStats = () => {

    const [cryptoData, setCryptoData] = useState('')

    const getGlobalStats = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/stats',
                params: { referenceCurrencyUuid: 'yhjMzLPhuIDl' },
                headers: {
                    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
                    'X-RapidAPI-Key': 'fb8fef0350msh351759caacd139dp1774fajsn01c73d537b42'
                }
            }
            const { data } = await axios(options)
            // console.log(data)
            setCryptoData(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGlobalStats()
    }, [])


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
                    <h3>Total Crypto Coins : {cryptoData.totalCoins}</h3>
                    <h3>Total Crypto Exchanges : {cryptoData.totalExchanges}</h3>
                    <h3>Last 24hrs Transactions Volume : {millify(cryptoData.total24hVolume)}</h3>
                    <h3>Total Market Cap : {millify(cryptoData.totalMarketCap)}</h3>
                </div>
                <div>
                    <h2>Newest Coins</h2>
                    {cryptoData.newestCoins.map((coin, index) => (
                        <div key={index} className="newestCoins">
                            <h3>{coin.name}</h3>
                            <h4>{coin.symbol}</h4>
                            <img src={coin.iconUrl} alt={coin.name} style={{ width: '50px', borderRadius: '50%' }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GlobalCryptoStats