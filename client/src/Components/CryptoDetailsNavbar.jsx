import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SingleCoin } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../config/Functions'
import millify from 'millify'
import { Button } from '@mui/material'

const CryptoDetailsNavbar = ({ coin }) => {

    const { token, currency, symbol, watchlistCoin, setWatchlistCoin } = CryptoContextState()

    const [coinData, setCoinData] = useState()
    const [loading, setLoading] = useState(false)

    const coinId = coin?.id

    const watchlist = watchlistCoin.includes(coinId)

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(coin.id))
        // console.log(data)
        setCoinData(data)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log('handleSubmit')
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.put('/user/addcoin', {
                coin: coinId,
            }, config)
            console.log(data)
            setLoading(false)
            setWatchlistCoin([...watchlistCoin, coinId])
            // console.log(watchlistCoin)
            // window.location.reload(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveCoin = async (e) => {
        setLoading(true)
        e.preventDefault()
        console.log('handleRemoveCoin')
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.put('/user/removecoin', {
                coin: coinId,
            }, config)
            // console.log(data)
            setLoading(false)
            setWatchlistCoin(watchlistCoin.filter(coin => coin !== coinId))
            // console.log(watchlistCoin)
            // window.location.reload(false)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchCoin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, watchlistCoin])

    return (
        <div
            style={{
                flex: 2.5,
                height: '90vh',
                backgroundColor: 'darkgoldenrod'
            }}
        >
            {
                coinData &&
                <>
                    <h2>{coinData.name}</h2>
                    <img src={coinData.image.large} alt={coinData.name} />
                    <h3>{coinData.symbol}</h3>
                    <h3>{ReactHtmlParser(coinData?.description.en.split('. ')[0])}.</h3>
                    <h3 style={{
                        color: coinData.price_change_percentage_24h > 0 ? 'green' : 'red'
                    }}>{coinData.market_data.price_change_percentage_24h}%</h3>
                    <h3>Rank : {coinData.market_cap_rank}</h3>
                    <h3>Current Price : {symbol} {numberWithCommas(coinData.market_data.current_price[currency.toLowerCase()])}</h3>
                    <h3>Market Cap : {symbol} {millify(coinData.market_data.market_cap[currency.toLowerCase()])}</h3>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}
                        onClick={watchlist ? handleRemoveCoin : handleSubmit}
                    >{watchlist ? 'remove from watchlist' : 'add to watchlist'}
                    </Button>
                </>
            }
        </div >
    )
}

export default CryptoDetailsNavbar