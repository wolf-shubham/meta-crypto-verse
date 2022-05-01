import React, { useEffect, useState } from 'react'
import { CryptoContextState } from '../context/CryptoContextAPI'
import { Button, Dialog } from '@mui/material'
import LoginDialog from './LoginDialog'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

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
                    alignItems: 'center',
                    padding: '0 1.5rem',
                    backgroundColor: 'black',
                }}
            >
                <div style={{
                    flex: 2.5,
                    display: 'flex',
                }}>
                    <img src={logo} alt="logo" style={{ width: '40px', marginRight: '1.5rem' }} />
                    <Link to='/' style={{ textDecoration: 'none', color: 'goldenrod' }}><h1>Crypto-Verse</h1></Link>
                </div>

                <div style={{
                    display: 'flex',
                    width: '25%',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    color: 'goldenrod',
                }}>
                    <h2>{user?.name.toUpperCase()}</h2>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ padding: '5px' }}>
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