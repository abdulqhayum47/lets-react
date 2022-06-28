import { Outlet, Navigate } from 'react-router-dom';
import Auth from '../../../core/auth';
import './auth-shell.css';

function AuthShell() {
    const auth = Auth.isAuthenticated();

    if(auth) {
        return(
            <Navigate to={'/main/dashboard'}/>
        )
    } else {
        return (
            <div className='auth-shell'>
                <div className='left-auth-panel'>

                </div>
                <div className='auth-child-components-panel'>
                    <Outlet/>
                </div>
            </div>
        
        );
    }
  }

  export default AuthShell;
