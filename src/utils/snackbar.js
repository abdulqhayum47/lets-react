import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

function SnackbarHandler(props) {
    const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
      
    useEffect(() => {
        const postData = () => {
            setOpen(true);
        };
        postData();
      }, [props.message, props.type]);

    return (
        <Snackbar open={open} autoHideDuration={3000}  anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarHandler;