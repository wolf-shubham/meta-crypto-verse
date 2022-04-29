import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNavbar from '../components/LeftNavbar'
import { CryptoContextState } from '../context/CryptoContextAPI'

const Profile = () => {
    const { user } = CryptoContextState()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [navigate, user])

    return (
        <div style={{ display: 'flex' }}>
            <LeftNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'yellowgreen'
                }}
            >
                <h1>profile</h1>
            </div>
        </div>
    )
}

export default Profile