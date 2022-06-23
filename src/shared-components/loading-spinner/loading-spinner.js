import React from "react";
import "./loading-spinner.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingSpinner() {
  return (
    <Box style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)',
      display: 'flex', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
      <CircularProgress style={{top: '50%', position: 'absolute'}}/>
    </Box>
  );
}

export default LoadingSpinner;