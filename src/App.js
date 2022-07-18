import './App.css';
import Navbar from './shared-components/navbar/navbar';
import Login from './modules/auth/login/login';
import SignUp from './modules/auth/signup/signup';
import { Routes, Route } from 'react-router-dom';
import AuthShell from './modules/auth/auth-shell/auth-shell';
import Dashboard from './modules/main/dashboard/dashboard';
import UserList from './modules/main/users/user-list/user-list';
import UserEditor from './modules/main/users/user-editor/user-create';
import PrivateRoute from './protected-route';
import LandingPage from './landing-page';
import './css/mui-override.css';
import './css/helper.css';


function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
            <Route path="/" exact element={<LandingPage/>}/>
            
            <Route path="/auth" element={<AuthShell/>}>
              <Route path="login" element={<Login/>}></Route>
              <Route path="signup" element={<SignUp/>}></Route>
            </Route>

            <Route path="/main" element={<PrivateRoute/>}>
              <Route path="dashboard" element={<Dashboard/>}></Route>
              <Route path="users" element={<UserList/>}></Route>
              <Route path="users/:id" element={<UserEditor/>}></Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;