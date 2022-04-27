import React from 'react'
import LeftNavbar from '../Components/LeftNavbar'

const Home = () => {
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
                <h1>home</h1>
            </div>
        </div>
    )
}

export default Home