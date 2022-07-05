import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import GetData from '../../../../core/fetch-data';
import URL from '../../../../utils/url';

function UserList(props) {
    const [userList, setUserList] = useState(null);
    
    //handle callback from api handler 
    function apiCallResponse(response) {
        if(response.error) {
            return;
        } else if(response.data) {
            setUserList(response.data.data);
        }
    }

    return (
        <div>
            <h1> View users list here! </h1>
            {!userList && <GetData url={URL.users()} params="" sendResponse={apiCallResponse}/>}
            <Link to="new"> Create Users </Link>
            <Link to="1"> Edit User </Link>
        </div>
    );
}

export default UserList;