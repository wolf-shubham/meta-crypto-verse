import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Error404 from './Pages/Error404';
import CryptoDetails from './Pages/CryptoDetails';
import News from './Pages/News';
import CryptoCurrencies from './Pages/CryptoCurrencies';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cryptocurrencies' element={<CryptoCurrencies />} />
        <Route path='/crypto' element={<CryptoDetails />} />
        <Route path='/news' element={<News />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App;
