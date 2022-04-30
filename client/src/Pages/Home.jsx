import React, { useEffect, useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import axios from 'axios'
import { TrendingCoins } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { numberWithCommas } from '../config/Functions'
import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {

    const { currency, symbol } = CryptoContextState()
    const [trending, setTrending] = useState()
    const [loading, setLoading] = useState(false)
    const trendingCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(TrendingCoins(currency))
        // console.log(data);

        setTrending(data)
        setLoading(false)
    }

    useEffect(() => {
        trendingCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    return (
        <div style={{ display: 'flex' }}>
            <LeftNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'yellowgreen',
                    overflowY: 'scroll'
                }}
            >
                <Link to='/'><h1>Crypto</h1></Link>
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
                    {loading ? <CircularProgress /> :
                        (
                            trending && trending.map(trend => (

                                <div key={trend.id}>
                                    <Link to={`/crypto/${trend.id}`} ><h2>{trend.name}</h2>
                                        <img src={trend.image} alt={trend.name} /></Link>
                                    <h3>{trend.symbol}</h3>
                                    <h3>{symbol} {numberWithCommas(trend.current_price)}</h3>
                                    <h3 style={{
                                        color: trend.price_change_percentage_24h > 0 ? 'green' : 'red'
                                    }}>{trend.price_change_percentage_24h.toFixed(2)}</h3>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home