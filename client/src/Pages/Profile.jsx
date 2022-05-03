import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    // console.log(coinsData)

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
                    backgroundColor: 'white',
                    overflowY: 'scroll',
                    paddingLeft: '1rem',
                    paddingTop: '5px'
                }}
            >
                {watchlistCoin.length > 0 ? <h1>Your watchlist</h1> : <h1>You have no coins in your watchlist</h1>}
                <div style={{
                    backgroundColor: 'wheat',
                    margin: '20px auto',
                }}>
                    {coinsData.map((coin, i) => (
                        <div key={i} >
                            {
                                watchlistCoin.includes(coin.id) ?
                                    <div style={{
                                        float: 'left',
                                        width: '23.5%',
                                        height: '22vh',
                                        backgroundColor: 'white',
                                        marginLeft: '15px',
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '5px'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <img src={coin.image} alt={coin.name} style={{ width: '40px', marginRight: '1rem' }} />
                                                <div>
                                                    <Link to={`/crypto/${coin.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                        <h2>{coin.name}</h2>
                                                    </Link>
                                                    <h3>{coin.symbol}</h3>
                                                </div>
                                            </div>
                                            <i className="fa-solid fa-trash"
                                                onClick={(e) => { handleRemoveCoin(coin.id) }}
                                                style={{
                                                    fontSize: '1.2rem',
                                                    cursor: 'pointer'
                                                }}
                                            ></i>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginTop: '1.3rem'
                                        }}>
                                            <h3>
                                                {symbol}{" "}
                                                {numberWithCommas(coin.current_price.toFixed(2))}
                                            </h3>
                                            <h3 style={{
                                                color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'
                                            }}>{coin.price_change_percentage_24h.toFixed(2)}%</h3>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}

export default Profile