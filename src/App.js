import './App.css';
import Headers from './components/Header';
import UploadForm from './components/Uploadform';
import CreateDealForm from './pages/dashboard';
//import TokenDistribution from './pages/DistributeToken';
import DepositTokens from './pages/DepositTokens';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <div className="App">
      
      {/* <Headers/> */}
      <Router>
        <Routes>
          <Route path="/" element={<UploadForm/>}/>
          <Route path="/dashboard" element={<CreateDealForm/>}/>
          <Route path="/distribution-token" element={<DepositTokens/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
