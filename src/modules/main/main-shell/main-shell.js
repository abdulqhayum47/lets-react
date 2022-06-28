import { Link, Outlet } from 'react-router-dom';
import './main-shell.css';

function MainShell() {
    return (
        <div className='main-shell'>
            <div className='left-sidebar'>
                <Link to="/main/dashboard"> Dashboard </Link>
                <Link to="/main/users"> Users </Link>
            </div>
            <div className='child-components-panel'>
                <Outlet/>
            </div>
        </div>
       
    );
  }

  export default MainShell;
