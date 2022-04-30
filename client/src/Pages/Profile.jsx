import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNavbar from '../components/LeftNavbar'
import { numberWithCommas } from '../config/Functions'
import { CryptoContextState } from '../context/CryptoContextAPI'

const Profile = () => {
    const { coinsData, watchlistCoin, symbol } = CryptoContextState()
    const userInfo = localStorage.getItem('userInfo')

    const navigate = useNavigate()

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
                <div>
                    {coinsData.map((coin) => {
                        if (watchlistCoin.includes(coin.id))
                            return (
                                <div style={{ backgroundColor: 'red', marginTop: '1rem' }} key={coin.symbol}>
                                    <h2>{coin.name}</h2>
                                    <img src={coin.image} alt={coin.name} />
                                    <h3 style={{ display: "flex", gap: 8 }}>
                                        {symbol}{" "}
                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                    </h3>
                                </div>
                            );
                        else return <></>
                    })}
                </div>
            </div>
        </div >
    )
}

export default Profile