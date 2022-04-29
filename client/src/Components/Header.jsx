import React, { useState } from 'react'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { Button, Dialog } from '@mui/material'
import LoginDialog from './LoginDialog'

const Header = () => {

    const { currency, setCurrency, symbol } = CryptoContextState()

    const [loginDialog, setLoginDialog] = useState(false)

    return (
        <>
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
                <Button
                    onClick={() => setLoginDialog(true)}
                    color="primary"
                    variant="contained"
                >LOGIN</Button>
            </div>
            <Dialog
                open={loginDialog}
                onClose={() => setLoginDialog(!loginDialog)}
            >
                <LoginDialog />
            </Dialog >
        </>
    )
}

export default Header