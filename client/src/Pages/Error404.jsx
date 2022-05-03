import { Typography } from '@mui/material'
import React from 'react'
import LeftNavbar from '../components/LeftNavbar'

const Error404 = () => {
    return (
        <div style={{ display: 'flex' }}>
            <LeftNavbar />
            <div
                style={{
                    flex: 9.5,
                    height: '90vh',
                    backgroundColor: 'white',
                    overflowY: 'scroll',
                    paddingLeft: '1rem',
                    paddingTop: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.5rem',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h3" >Error 404.<br />Page Not Found ...</Typography>
            </div>
        </div>
    )
}

export default Error404