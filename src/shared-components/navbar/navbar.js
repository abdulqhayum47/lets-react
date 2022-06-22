
import './navbar.css';
import logo from '../../../src/images/mm-logo.png'
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <header className="App-header">
          <img src={logo} alt="logo" className='logo'/>
          <div className='links'>
            <Link to="/login"> Login </Link>
            <Link to="/signup"> SignUp </Link>
          </div>
        </header>

    );
  }

  export default Navbar;