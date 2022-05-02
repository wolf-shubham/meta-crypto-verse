import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../config/Functions'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { AddCircle } from '@mui/icons-material'
import axios from 'axios'

const Coin = ({ trend }) => {

    const { user, watchlistCoin, symbol, token, setWatchlistCoin } = CryptoContextState()
    const coinId = trend.id

    const handleSubmit = async (e) => {
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
            setWatchlistCoin([...watchlistCoin, coinId])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

    }, [watchlistCoin])

    return (
        <>
            <Card style={{ boxShadow: `rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em` }}>
                <Link to={`/crypto/${trend.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <CardHeader
                        title={<h4>{trend.name}</h4>}
                        avatar={
                            <img src={trend.image} alt={trend.name} style={{ width: '35px', height: '35px' }} />
                        }
                        subheader={trend.symbol}
                        action={watchlistCoin.includes(trend.id) ? null : (user ? <AddCircle onClick={handleSubmit} style={{ color: '#24A19C' }} /> : null)}
                    >
                    </CardHeader>
                </Link>
                <CardContent sx={{ mb: -1, mt: -1 }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <h3>{symbol}{numberWithCommas(trend.current_price)}</h3>
                            <h3 style={{
                                color: trend.price_change_percentage_24h > 0 ? 'green' : 'red'
                            }}>{trend.price_change_percentage_24h.toFixed(2)}%</h3>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default Coin