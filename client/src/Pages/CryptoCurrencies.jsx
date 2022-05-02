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
                    backgroundColor: 'white',
                    paddingLeft: '1rem',
                    paddingTop: '5px'
                }}
            >
                <CryptoCoins />
            </div>
        </div>
    )
}

export default CryptoCurrencies