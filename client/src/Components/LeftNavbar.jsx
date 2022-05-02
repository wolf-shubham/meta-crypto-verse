import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LeftNavbar = () => {

    const [tab, setTab] = useState(window.location.pathname)

    return (
        <div style={{
            flex: 2.5,
            height: '90vh',
            backgroundColor: 'black',
            textDecoration: 'none',
            borderLeft: 'none',
            textAlign: 'center',
        }}>
            <Link to='/' onClick={() => setTab('/')} style={{ textDecoration: 'none' }}>
                {
                    tab === '/' ?
                        <h2 style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem 1rem' }}>Home</h2> :
                        <h2 style={{ color: 'goldenrod', padding: '0.5rem 1rem' }}>Home</h2>
                }
            </Link>
            <Link to='/profile' onClick={() => setTab('/profile')} style={{ textDecoration: 'none' }}>
                {
                    tab === '/profile' ?
                        <h2 style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem 1rem' }}>Profile</h2> :
                        <h2 style={{ color: 'goldenrod', padding: '0.5rem 1rem' }} >Profile</h2>
                }
            </Link>
            <Link to='/news' onClick={() => setTab('/news')} style={{ textDecoration: 'none' }}>
                {
                    tab === '/news' ?
                        <h2 style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem 1rem' }}>News</h2> :
                        <h2 style={{ color: 'goldenrod', padding: '0.5rem 1rem' }} >News</h2>
                }
            </Link>
            <Link to='/cryptocurrencies' onClick={() => setTab('/cryptocurrencies')} style={{ textDecoration: 'none' }}>
                {
                    tab === '/cryptocurrencies' ?
                        <h2 style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem 1rem' }}>Crypto -Currencies</h2> :
                        <h2 style={{ color: 'goldenrod', padding: '0.5rem 1rem' }} >Crypto -Currencies</h2>
                }
            </Link>
            <Link to='/global-stats' onClick={() => setTab('/global-stats')} style={{ textDecoration: 'none' }}>
                {
                    tab === '/global-stats' ?
                        <h2 style={{ color: 'black', backgroundColor: 'white', padding: '0.5rem 1rem' }}>Global-Crypto-Stats</h2> :
                        <h2 style={{ color: 'goldenrod', padding: '0.5rem 1rem' }} >Global-Crypto-Stats </h2>
                }
            </Link>
        </div>
    )
}

export default LeftNavbar