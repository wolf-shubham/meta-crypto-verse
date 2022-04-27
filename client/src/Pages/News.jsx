import React from 'react'
import LeftNavbar from '../components/LeftNavbar'

const News = () => {
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
                <h1>news</h1>
            </div>
        </div>
    )
}

export default News