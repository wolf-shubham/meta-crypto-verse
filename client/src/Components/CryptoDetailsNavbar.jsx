import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SingleCoin } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { numberWithCommas } from '../config/Functions'
import { Button } from '@mui/material'

const CryptoDetailsNavbar = ({ coin }) => {

    const { user, token, currency, symbol, watchlistCoin, setWatchlistCoin } = CryptoContextState()

    const [coinData, setCoinData] = useState()
    const [loading, setLoading] = useState(false)

    const coinId = coin?.id

    const watchlist = watchlistCoin.includes(coinId)

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(coin.id))
        console.log(data);
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
            console.log(data)
            setLoading(false)
            setWatchlistCoin(watchlistCoin.filter(coin => coin !== coinId))
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
                backgroundColor: 'black',
                color: 'darkgoldenrod',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '20px',
            }}
        >
            {
                coinData &&
                <>
                    <img src={coinData.image.large} alt={coinData.name} style={{ width: '10rem' }} />
                    <h2>{coinData.name} ({coinData.symbol})</h2>
                    <h3>Rank : {coinData.market_cap_rank}</h3>
                    <h3>Current Price : {symbol} {numberWithCommas(coinData.market_data.current_price[currency.toLowerCase()])}</h3>
                    <h3>Price Change :{' '}
                        <span
                            style={{
                                color: coinData.market_data.price_change_percentage_24h > 0 ? 'green' : 'red'
                            }}
                        >
                            {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                        </span>
                    </h3>
                    <h3>Market Cap : {symbol} {coinData.market_data.market_cap[currency.toLowerCase()]}</h3>
                    <h3>Max Coin Supply : {coinData.market_data.max_supply}</h3>
                    <h3>Ledger start : {coinData.genesis_date}</h3>
                    <h3>Hashing Algo : {coinData.hashing_algorithm}</h3>
                    {user ?
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            style={{
                                marginBottom: '25px'
                            }}
                            onClick={watchlist ? handleRemoveCoin : handleSubmit}
                        >{watchlist ? 'remove from watchlist' : 'add to watchlist'}
                        </Button> :
                        null
                    }

                </>
            }
        </div >
    )
}

export default CryptoDetailsNavbar