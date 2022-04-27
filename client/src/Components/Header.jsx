import React from 'react'
import { CryptoContextState } from '../Context/CryptoContextAPI'

const Header = () => {

    const { currency, setCurrency, symbol } = CryptoContextState()

    return (
        <div
            style={{
                width: '100%',
                height: '10vh',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <h1>logo</h1>
            <h3>username</h3>
            <h3>button</h3>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value='INR'>INR</option>
                <option value="USD">USD</option>
            </select>
            <h2>{symbol}</h2>
        </div>
    )
}

export default Header