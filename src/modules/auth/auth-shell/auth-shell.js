import { Outlet } from 'react-router-dom';
import './auth-shell.css';

function AuthShell() {
    return (
        <div className='auth-shell'>
            <div className='left-panel'>

            </div>
            <div className='child-components-panel'>
                <Outlet/>
            </div>
        </div>
       
    );
  }

  export default AuthShell;
