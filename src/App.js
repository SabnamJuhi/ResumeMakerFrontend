
import './App.css';
import Home from './components/Homepage/index';
import Loginpage from './components/Loginpage/index';
import SignupPage from './components/Loginpage/SignupPage'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/home/*" element={<Home/>}/>
        <Route path="/*" element={<Loginpage />}/>
      </Routes>
    </Router>
       
      {/* <Loginpage /> */}
      {/* <SignupPage /> */}
      
    </div>
  );
}

export default App;
