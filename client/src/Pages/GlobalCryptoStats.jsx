import React, { useEffect, useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import axios from 'axios'
import { Card, CardHeader, CircularProgress, Grid, Typography } from '@mui/material'

const GlobalCryptoStats = () => {

    const [cryptoData, setCryptoData] = useState()
    const [newCoins, setNewCoins] = useState()
    const [loading, setLoading] = useState(false)

    const getGlobalStats = async () => {
        try {
            setLoading(true)
            const options = {
                method: 'GET',
                url: 'https://coingecko.p.rapidapi.com/global',
                headers: {
                    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
                    'X-RapidAPI-Key': 'fb8fef0350msh351759caacd139dp1774fajsn01c73d537b42'
                }
            };
            const { data } = await axios(options)
            // console.log(data.data)
            setCryptoData(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const newestCoins = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/stats',
                params: { referenceCurrencyUuid: 'yhjMzLPhuIDl' },
                headers: {
                    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
                    'X-RapidAPI-Key': 'fb8fef0350msh351759caacd139dp1774fajsn01c73d537b42'
                }
            }
            const { data } = await axios(options)
            // console.log(data)
            setNewCoins(data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGlobalStats()
    }, [])
    useEffect(() => {
        newestCoins()
    }, [])


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
                {
                    loading ?
                        <CircularProgress /> :
                        <>
                            <div className="globalStats">
                                <Typography variant="h3" >Global Stats</Typography>
                                <Typography variant="h5">Currencies in circulation : {cryptoData?.active_cryptocurrencies}</Typography>
                                <Typography variant="h5">Total Markets : {cryptoData?.markets}</Typography>
                                <Typography variant="h5">Ongoing ICOs : {cryptoData?.ongoing_icos}</Typography>
                                <Typography variant="h5">Ended ICOs : {cryptoData?.ended_icos}</Typography>
                                <Typography variant="h5">Market Cap Change in last 24hrs : <span
                                    style={{
                                        color: cryptoData?.price_change_percentage_24h > 0 ? 'green' : 'red'
                                    }}
                                >{cryptoData?.market_cap_change_percentage_24h_usd.toFixed(2)}%</span></Typography>
                            </div>
                            <Typography variant="h3" style={{ margin: '1rem 0' }}>
                                Latest Coins
                            </Typography>
                            <Grid container rowSpacing={2} columnSpacing={2}>
                                {
                                    newCoins && newCoins.newestCoins.map(trend => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={trend.uuid}>
                                            <Card >
                                                <CardHeader
                                                    avatar={
                                                        <img src={trend.iconUrl} alt={trend.name} style={{ width: '50px', height: '50px' }} />
                                                    }
                                                    title={<h2>{trend.name}</h2>}
                                                    subheader={<h3>{trend.symbol}</h3>}
                                                />
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </>
                }
            </div>
        </div >
    )
}

export default GlobalCryptoStats