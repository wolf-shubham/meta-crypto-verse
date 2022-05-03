import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LeftNavbar from '../components/LeftNavbar'
import logo from '../images/logo.png'

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
            // console.log(data)
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
                    backgroundColor: 'white',
                    overflowY: 'scroll',
                    paddingLeft: '1rem',
                    paddingTop: '5px'
                }}
            >
                {
                    news.map((news, i) => (
                        <div key={i} style={{ display: 'flex', boxShadow: `rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset`, padding: '1rem 0', marginTop: '15px', marginRight: '1rem', borderRadius: '5px' }}>
                            <div >
                                <img src={news?.image?.thumbnail?.contentUrl || logo} alt={''}
                                    style={{
                                        width: '100px',
                                        marginLeft: '1rem'
                                    }}
                                />
                            </div>
                            <div style={{ margin: '0 1rem' }}>
                                <a href={news.url} target='_blank' rel='noreferrer' style={{ color: 'black', textDecoration: 'none' }}>
                                    <h2>{news.name}</h2>
                                </a>
                                <h3 style={{ color: '#393E46', marginTop: '5px' }}>{news.description}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default News