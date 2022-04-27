import React from 'react'
import CryptoDetailsNavbar from '../Components/CryptoDetailsNavbar'

const CryptoDetails = () => {
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
                <h1>crypto currency details</h1>
            </div>
        </div>
    )
}

export default CryptoDetails