import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import Register from './Register';


const LoginDialog = () => {

    const [value, setValue] = React.useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div
            style={{
                width: '27.5rem',
                height: '30rem',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    typography: 'body1'
                }}
            >
                <TabContext value={value} >
                    <Box
                        sx={{
                            borderBottom: 2,
                            borderColor: 'divider'
                        }} >
                        <TabList
                            onChange={handleChange}
                            centered
                            style={{
                                width: '100%'
                            }}>
                            <Tab
                                label="Login"
                                value="1"
                                style={{
                                    width: '50%',
                                    fontSize: '1.5rem'
                                }} />

                            <Tab
                                label="Register"
                                value="2"
                                style={{
                                    width: '50%',
                                    fontSize: '1.5rem'
                                }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><Login /></TabPanel>
                    <TabPanel value="2"><Register /></TabPanel>
                </TabContext>
            </Box >
        </div>
    )
}

export default LoginDialog