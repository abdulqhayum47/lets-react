
import './navbar.css';
import logo from '../../../src/images/mm-logo.png'
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

function Navbar() {
  const location = useLocation();

  const logout = ((props) => {
    localStorage.clear();
    window.location = "/auth/login"
  });
    return (
        <header className="App-header">
          <Link to="/"> <img src={logo} alt="logo" className='logo'/> </Link>
          {!!(~location.pathname.indexOf("/auth")) &&  
            <div className='links'>
              <Link to="/auth/login"> Login </Link>
              <Link to="/auth/signup"> Sign Up </Link>  
            </div>
          }

          {!!(~location.pathname.indexOf("/main")) &&  
            <div className='links'>
              <Button type='button' variant='primary' onClick={logout}> Logout </Button>
            </div>
          } 

        </header>

    );
  }

  export default Navbar;
