import React from 'react'

const Header = () => {
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
            <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </div>
    )
}

export default Header