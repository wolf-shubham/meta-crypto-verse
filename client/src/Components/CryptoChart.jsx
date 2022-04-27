import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { HistoricalChart } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { Line } from "react-chartjs-2"

const CryptoChart = () => {

    const { id } = useParams()
    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)

    const { currency, symbol } = CryptoContextState()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(id, days, currency))
        console.log(data)
        setHistoricData(data.prices)
    }
    useEffect(() => {
        fetchHistoricalData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])

    return (
        <div>
            <h1>CryptoChart</h1>
        </div>
    )
}

export default CryptoChart