import { Button, Grid, Paper } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import Coin from './Coin'


const CryptoCoins = () => {

    const { currency } = CryptoContextState()

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
        <div style={{ marginRight: '1rem' }}>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='search coin...'
                style={{
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    padding: '0.6rem',
                    marginTop: '5px',
                    marginBottom: '10px',
                    fontSize: '1rem',
                }}
            />
            <Grid container rowSpacing={2} columnSpacing={2}>
                {
                    handleSearch()
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map(coin => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id}>
                                <Paper>
                                    <Coin trend={coin} />
                                </Paper>
                            </Grid>
                        ))
                }
            </Grid>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem'
            }}>
                {
                    coins.length > 10 &&
                    <Button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        variant='contained'
                    >
                        Prev
                    </Button>
                }
                {(coins.length / 10) > page &&
                    <Button
                        variant='contained'
                        onClick={() => setPage(page + 1)}
                    >
                        next
                    </Button>
                }
            </div>
        </div>
    )
}

export default CryptoCoins