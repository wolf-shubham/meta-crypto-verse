import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { HistoricalChart } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { Line } from "react-chartjs-2"
import { CircularProgress } from '@mui/material'
import { Chart as ChartJS } from 'chart.js/auto'

const CryptoChart = ({ coin }) => {

    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)

    const { currency, symbol } = CryptoContextState()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        // console.log(data)
        setHistoricData(data.prices)
    }


    useEffect(() => {
        fetchHistoricalData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days])

    return (
        <div>
            {
                !historicData ?
                    <CircularProgress />
                    : (
                        <>
                            <Line
                                data={{
                                    labels: historicData?.map(item => {
                                        let date = new Date(item[0])
                                        let time = date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`
                                        return days === 1 ? time : date.toLocaleDateString()
                                    }),
                                    datasets: [
                                        {
                                            data: historicData?.map(item => item[1]),
                                            label: `Price in ${currency} ${symbol} over last ${days} days`,
                                            borderColor: '#3f51b5',
                                        }]
                                }}
                                options={{
                                    elements: {
                                        point: { radius: 0 }
                                    }
                                }}
                            />
                        </>
                    )
            }
            <button onClick={() => setDays(1)}>1 day</button>
            <button onClick={(e) => setDays(7)}>1 week</button>
            <button onClick={(e) => setDays(30)}>1 month</button>
            <button onClick={(e) => setDays(365)}>1 year</button>
        </div>
    )
}

export default CryptoChart