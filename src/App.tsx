import CryptoList from './pages/cryptoList';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CryptoDetail from './pages/cryptoDetail';
import {ROUTE_PATH} from "./util/constants/routes"
import "./App.css"
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_PATH.HOME} element ={<CryptoList />} />
                <Route path={`${ROUTE_PATH.CRYPTO_DETAIL}/:id`} element = {<CryptoDetail/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
