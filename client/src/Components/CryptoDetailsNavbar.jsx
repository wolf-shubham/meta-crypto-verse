import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SingleCoin } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../config/Functions'
import millify from 'millify'

const CryptoDetailsNavbar = ({ coin }) => {

    const [coinData, setCoinData] = useState()
    const { currency, symbol } = CryptoContextState()

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(coin.id))
        console.log(data)
        setCoinData(data)
    }

    useEffect(() => {
        fetchCoin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

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
                </>
            }
        </div>
    )
}

export default CryptoDetailsNavbar