import React, { useEffect, useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import axios from 'axios'
import { TrendingCoins } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { CircularProgress, Grid, Paper } from '@mui/material'
import Coin from '../components/Coin'

const Home = () => {

    const { currency } = CryptoContextState()
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
                    backgroundColor: 'white',
                    overflowY: 'scroll',
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
                <h1>Crypto Currencies</h1>
                {loading ? <CircularProgress /> :
                    (
                        <Grid container rowSpacing={1} columnSpacing={2}>
                            {
                                trending && trending.map(trend => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={trend.id}>
                                        <Paper>
                                            <Coin trend={trend} />
                                        </Paper>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    )
                }
            </div>
        </div>
    )
}

export default Home