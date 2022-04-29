import { createContext, useContext, useEffect, useState } from "react"

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [user, setUser] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        if (currency === 'INR') {
            setSymbol('₹')
        } else if (currency === 'USD') {
            setSymbol('$')
        }
    }, [currency])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        const userToken = JSON.parse(localStorage.getItem("token"));
        setToken(userToken);
    }, [user, token])

    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol, setSymbol, user, setUser, token, setToken }}>
            {children}
        </Crypto.Provider>
    )
}



export const CryptoContextState = () => {
    return useContext(Crypto)
}

export default CryptoContext