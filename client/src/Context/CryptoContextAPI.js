import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { CoinList } from "../config/Api"

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [user, setUser] = useState(null)
    const [token, setToken] = useState()
    const [coinsData, setCoinsData] = useState([])
    const [watchlistCoin, setWatchlistCoin] = useState([])

    const fetchCoins = async () => {
        const token = JSON.parse(localStorage.getItem("token"))
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get('/user/allcoins', config)
            // console.log(data)
            setWatchlistCoin(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCoinsData = async () => {
        try {
            const { data } = await axios.get(CoinList(currency))
            setCoinsData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCoinsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchCoins()
    }, [])


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
        <Crypto.Provider value={{ currency, setCurrency, symbol, setSymbol, user, setUser, token, setToken, coinsData, setCoinsData, watchlistCoin, setWatchlistCoin }}>
            {children}
        </Crypto.Provider>
    )
}



export const CryptoContextState = () => {
    return useContext(Crypto)
}

export default CryptoContext