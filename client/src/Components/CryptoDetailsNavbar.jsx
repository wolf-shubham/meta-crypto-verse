import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../config/Functions'
import millify from 'millify'

const CryptoDetailsNavbar = () => {

    const { id } = useParams()
    const [coin, setCoin] = useState()
    const { currency, symbol } = CryptoContextState()

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        // console.log(data)
        setCoin(data)
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
            <h1>crypto currency details</h1>
            {
                coin &&
                <>
                    <h2>{coin.name}</h2>
                    <img src={coin.image.large} alt={coin.name} />
                    <h3>{coin.symbol}</h3>
                    <h3>{ReactHtmlParser(coin?.description.en.split('. ')[0])}.</h3>
                    <h3 style={{
                        color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'
                    }}>{coin.price_change_percentage_24h}%</h3>
                    <h3>Rank : {coin.market_cap_rank}</h3>
                    <h3>Current Price : {symbol} {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}</h3>
                    <h3>Market Cap : {symbol} {millify(coin.market_data.market_cap[currency.toLowerCase()])}</h3>
                </>
            }
        </div>
    )
}

export default CryptoDetailsNavbar