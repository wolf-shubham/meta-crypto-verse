import React from 'react'
import CryptoCoins from '../components/CryptoCoins'
import LeftNavbar from '../components/LeftNavbar'

const CryptoCurrencies = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LeftNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'yellowgreen',
                    overflowY: 'scroll',
                    paddingLeft: '1rem',
                    paddingTop: '5px'
                }}
            >
                <h1>cryptocurrencies</h1>
                <CryptoCoins />
            </div>
        </div>
    )
}

export default CryptoCurrencies