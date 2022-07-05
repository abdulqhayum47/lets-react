import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import GetData from '../../../../core/fetch-data';
import URL from '../../../../utils/url';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

function UserList(props) {
    const [userList, setUserList] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'email',
          headerName: 'Email',
          width: 300,
        },
        { field: 'first_name', headerName: 'First name', width: 200 },
        { field: 'last_name', headerName: 'Last name', width: 200 },
        { field: 'action', sortable: false, headerName: 'Action', width: 200,  renderCell: (cellValues) => {
            return <Link to={`${cellValues.row.id}`}>View/Edit</Link>;
          }
        }
      ];
    
    //handle callback from api handler 
    function apiCallResponse(response) {
        if(response.error) {
            return;
        } else if(response.data) {
            setUserList(response.data.data.data);
        }
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Users</h1>
                <Button variant="contained" style={{height: '40px', marginTop: '20px', cursor: 'pointer'}} className="primary-button">
                    <Link to="new" style={{color: '#fff', textDecoration: 'none'}}> Create Users </Link>
                </Button>
            </div>
                    
            <GetData url={URL.users()} params="" sendResponse={apiCallResponse}/>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={userList}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                />
            </div>
        </div>
    );
}

export default UserList;