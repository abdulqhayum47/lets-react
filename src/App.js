import './App.css';
import Navbar from './shared-components/navbar/navbar';
import Login from './modules/auth/login/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </div>
   </Router>

  );
}

export default App;
