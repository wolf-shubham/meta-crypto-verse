import React from 'react'
import CryptoDetailsNavbar from '../components/CryptoDetailsNavbar'
import CryptoChart from '../components/CryptoChart'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { SingleCoin } from '../config/Api'
import { useEffect } from 'react'
import { CryptoContextState } from '../context/CryptoContextAPI'

const CryptoDetails = () => {

    // const { id } = useParams()
    // const [coin, setCoin] = useState()

    // const { currency, symbol } = CryptoContextState()

    // const fetchCoin = async () => {
    //     const { data } = await axios.get(SingleCoin(id))
    //     // console.log(data)
    //     setCoin(data)
    // }

    // useEffect(() => {
    //     fetchCoin()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currency])

    return (
        <div style={{ display: 'flex' }}>
            <CryptoDetailsNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'yellowgreen'
                }}
            >
                <CryptoChart />
            </div>
        </div>
    )
}

export default CryptoDetails