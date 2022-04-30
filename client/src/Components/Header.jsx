import React, { useEffect, useState } from 'react'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { Button, Dialog } from '@mui/material'
import LoginDialog from './LoginDialog'
import { Link } from 'react-router-dom'

const Header = () => {

    const { user, currency, setCurrency, symbol } = CryptoContextState()

    const [loginDialog, setLoginDialog] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
    }
    useEffect(() => {

    }, [user])

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
                <Link to='/'><h1>Crypto</h1></Link>
                <h3>{user?.name}</h3>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value='INR'>INR {symbol}</option>
                    <option value="USD">USD {symbol}</option>
                </select>
                {
                    user && user ?
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleLogout}
                        >Logout
                        </Button>
                        :
                        <Button
                            onClick={() => setLoginDialog(true)}
                            color="primary"
                            variant="contained"
                        >LOGIN</Button>
                }

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