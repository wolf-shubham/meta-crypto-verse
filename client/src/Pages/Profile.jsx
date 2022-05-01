import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNavbar from '../components/LeftNavbar'
import { numberWithCommas } from '../config/Functions'
import { CryptoContextState } from '../context/CryptoContextAPI'

const Profile = () => {

    const { coinsData, watchlistCoin, symbol, token, setWatchlistCoin } = CryptoContextState()
    const userInfo = localStorage.getItem('userInfo')

    const navigate = useNavigate()

    const handleRemoveCoin = async (coinId) => {
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
            setWatchlistCoin(watchlistCoin.filter(coin => coin !== coinId))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

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
                <h1>profile</h1>
                {watchlistCoin.length > 0 ? <h1>Your watchlist</h1> : <h1>You have no coins in your watchlist</h1>}
                <div>
                    {coinsData.map((coin, i) => (
                        <div key={i}>
                            {
                                watchlistCoin.includes(coin.id) ?
                                    <div>
                                        <h2>{coin.name}</h2>
                                        <img src={coin.image} alt={coin.name} />
                                        <h3 style={{ display: "flex", gap: 8 }}>
                                            {symbol}{" "}
                                            {numberWithCommas(coin.current_price.toFixed(2))}
                                        </h3>
                                        <i className="fa-solid fa-trash"
                                            onClick={(e) => { handleRemoveCoin(coin.id) }}
                                        ></i>
                                    </div>
                                    : null
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Profile