import React from 'react'
import { Link } from 'react-router-dom'

const LeftNavbar = () => {
    return (
        <div style={{
            flex: 2.5,
            height: '90vh',
            backgroundColor: 'darkgoldenrod'
        }}>
            <h1><Link to='/'>home</Link></h1>
            <h1><Link to='/profile'>profile</Link></h1>
            <h1><Link to='/news'>news</Link></h1>
            <h1><Link to='/cryptocurrencies'>crypto-currencies</Link></h1>
        </div>
    )
}

export default LeftNavbar