import './App.css';
import Navbar from './shared-components/navbar/navbar';
import Login from './modules/auth/login/login';
import SignUp from './modules/auth/signup/signup';
import { Routes, Route } from 'react-router-dom';
import AuthShell from './modules/auth/auth-shell/auth-shell';


function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<AuthShell/>}>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<SignUp/>}></Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
