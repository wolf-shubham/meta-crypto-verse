import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import axios from 'axios'


const Register = () => {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            }
            const { data } = await axios.post('/user/register', {
                name,
                email,
                password
            }, config)
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            localStorage.setItem('token', JSON.stringify(data.token))
            setLoading(false)
            window.location.reload(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    return (
        <>
            <div className="loginRight">
                <form className='loginForm' onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={name}
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me" checked
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                        disabled={loading}
                    >REGISTER</Button>
                </form>
                {/* {error && <Error message={error} /> */}
            </div>
        </>
    )
}


export default Register