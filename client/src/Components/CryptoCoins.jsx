import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'

const CryptoCoins = () => {

    const { currency, symbol } = CryptoContextState()

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const fetchCoins = async () => {
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
    }

    const handleSearch = () => {
        return coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
    }

    useEffect(() => {
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    // useEffect(() => {
    // }, [currency])


    return (
        <div>
            <h1>CryptoCoins</h1>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search coin...' />
            {
                handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map(coin => (
                        <div key={coin.id}>
                            <h2>{coin.name}</h2>
                            {/* <img src={coin.image} alt={coin.name} /> */}
                            <h3>{coin.symbol}</h3>
                            <h3>{symbol} {coin.current_price}</h3>
                            <h3 style={{
                                color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'
                            }}>{coin.price_change_percentage_24h.toFixed(2)}</h3>
                        </div>
                    ))
            }
            {page === 1 ? null : <button onClick={() => setPage(page - 1)}>prev</button>}
            {/* <button onClick={() => setPage(page - 1)}>previous</button> */}
            <button onClick={() => setPage(page + 1)}>next</button>

        </div>
    )
}

export default CryptoCoins