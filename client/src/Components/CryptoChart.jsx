import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { HistoricalChart } from '../config/Api'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { Line } from "react-chartjs-2"
import { Button, CircularProgress } from '@mui/material'
// eslint-disable-next-line no-unused-vars
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
                                            borderColor: 'goldenrod',
                                            fill: false
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
            <div style={{
                width: '70%',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '15%',
                justifyContent: 'space-around',
                fontWeight: '600'

            }}>
                <Button disabled={days === 1} onClick={() => setDays(1)} style={{
                    backgroundColor: days === 1 ? 'black' : '',
                    border: '1px solid black',
                    color: days === 1 ? 'goldenrod' : 'black',
                    fontWeight: '600'
                }}>1 day</Button>
                <Button disabled={days === 7} onClick={(e) => setDays(7)} style={{
                    backgroundColor: days === 7 ? 'black' : '',
                    border: '1px solid black',
                    color: days === 7 ? 'goldenrod' : 'black',
                    fontWeight: '600'
                }}>1 week</Button>
                <Button disabled={days === 30} onClick={(e) => setDays(30)} style={{
                    backgroundColor: days === 30 ? 'black' : '',
                    border: '1px solid black',
                    color: days === 30 ? 'goldenrod' : 'black',
                    fontWeight: '600'
                }}>1 month</Button>
                <Button disabled={days === 365} onClick={(e) => setDays(365)} style={{
                    backgroundColor: days === 365 ? 'black' : '',
                    border: '1px solid black',
                    color: days === 365 ? 'goldenrod' : 'black',
                    fontWeight: '600'
                }}>1 year</Button>
            </div>
        </div>
    )
}

export default CryptoChart