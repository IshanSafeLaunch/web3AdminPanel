import './App.css';
import Headers from './components/Header';
import UploadForm from './components/Uploadform';
import CreateDealForm from './pages/dashboard';
//import TokenDistribution from './pages/DistributeToken';
import DepositTokens from './pages/DepositTokens';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MetamaskProvider } from './components/Metamask';
import ParentComponent from './components/Parentcom'


function App() {
  
  return (
    <div className="App">
       <MetamaskProvider>
      {/* <Headers/> */}
      <Router>
        <Routes>
          <Route path="/" element={<ParentComponent/>}/>
          <Route path="/dashboard" element={<CreateDealForm/>}/>
          <Route path="/distribution-token" element={<DepositTokens/>}/>
        </Routes>
      </Router>
      </MetamaskProvider>,
      
    </div>
  );
}

export default App;
