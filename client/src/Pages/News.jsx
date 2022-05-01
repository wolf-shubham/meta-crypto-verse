import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'

const News = () => {

    const [news, setNews] = useState([])

    const handleFetchData = async () => {
        try {
            const options = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news/search',
                params: {
                    q: 'Cryptocurrency',
                    count: '50',
                    freshness: 'Day',
                    textFormat: 'Raw',
                    safeSearch: 'Off'
                },
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
                    'X-RapidAPI-Key': 'fb8fef0350msh351759caacd139dp1774fajsn01c73d537b42'
                }
            }
            const { data } = await axios(options)
            console.log(data)
            setNews(data.value)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleFetchData()
    }, [])

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
                <h1>news</h1>
                {
                    news.map((news, i) => (
                        <div key={i}>
                            <a href={news.url} target='_blank' rel='noreferrer'>
                                <h2>{news.name}</h2>
                                <h3>{news.description}</h3>
                                <img src={news?.image?.thumbnail?.contentUrl} alt='' />
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default News