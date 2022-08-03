import * as React from "react";
import "./alert-dialog.css";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

/** Reusable alert dialog component, example for showing success, error & warning alerts. */
function AlertDialog(props) {
  const {type, open, handleClose, title, subtitle, message, icon, sx, rejectBtn, approveBtn, handleReject, handleApprove} = props;

  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      type={type}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={sx}
      style={{textAlign: "center"}}>
            
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <div><Icon className={type === "success"? "success" : type === "error" ? "error" : "warning"} style={{fontSize: 30}}> {icon} </Icon></div>
      <h3 style={{margin: "0px"}}>{subtitle}</h3>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject}>{rejectBtn}</Button>
        <Button onClick={handleApprove}>{approveBtn}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;