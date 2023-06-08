import './App.css';
import CryptoNavbar from './componets/Navbar';
import SearchResults from './api/Cryptoapi';
// import { BrowserRouter as Router, Switch, Router } from 'react-router-dom';
// import CryptoGraph from './componets/Cryptograph';

function App() {
  return (
    <div className="App">
      <CryptoNavbar />
      <SearchResults />
    </div>
  );
}

export default App;
