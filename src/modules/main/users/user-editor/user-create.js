/* eslint-disable linebreak-style */
import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Input from "../../../../shared-components/controls/Input";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import URL from "../../../../utils/url";
import PostData from "../../../../core/post-data";
import GetData from "../../../../core/fetch-data";
import { useNavigate, useParams } from "react-router-dom";
import AlertDialog from "../../../../shared-components/dialog/alert-dialog";

function UserEditor() {
  let navigate = useNavigate();
  const params = useParams();

  const initialFormValues = {
    first_name: "",
    last_name: "",
    email: ""
  };

  const [mode, setMode] = useState(null);
  const [formData, setFormData] = React.useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [userCreateSuccess, setUserCreateSuccess] = useState(false);
  const [userCreateError, setUserCreateError] = useState(false);
  const [userReadError, setUserReadError] = useState(false);
  const [userUpdateWarning, setUserUpdateWarning] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState(false);
  const [openDialog, setOpenAlertDialog] = useState(false);
  const [approveFlag, setApproveFlag] = useState(false);

  /** Checks for form mode after rendering fetched data/ directly updating the DOM.
     * useEffect runs after every DOM render/any changes to the DOM.
    */
  useEffect(()=> {
    function setFormMode() {
      params.id === "new" ? setMode("CREATE") : setMode("READ");
    }
    setFormMode();
  }, [params]);

  /** Handle user form input 
     * @param event handleChange event object
     * */ 
  function handleChange(event) {
    event.preventDefault();
    const {name, value} = event.target;
    setFormData((prevFormData)=> {
      return {
        ...prevFormData,
        [name]: value
      };
    });
    validate();
  }

  const emailValidator =  (email) => {
    if (email === "") {
      return "Email is mandatory field.";
    }

    if (!(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email)) {
      return "Email is not valid.";
    }
    return "";
  };

  // Validate form input fields
  const validate = () => {
    let temp= {};
    temp.first_name = formData.first_name ? "" : "First Name is mandatory field.";
    temp.last_name = formData.last_name ? "" : "Last Name is mandatory field.";
    temp.email = emailValidator(formData.email);

    setErrors({
      ...temp 
    });

    return Object.values(temp).every(val => val === "");
  };

  /** Marks form validation status
     * @param event submit form event object
    */
  function submitForm(event) {
    event.preventDefault();
    if(!validate()){
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }

  /** Handles CREATE & UPDATE API callback response.
     * @param response API call response object.
     */
  function submitFormApiCallResponse(response) {
    if(mode === "CREATE") {
      if(response.error) {
        setUserCreateError(true);
        setOpenAlertDialog(true);
        setFormData(initialFormValues);
        setFormValid(false);
      } else if(response.data) {
        setUserCreateSuccess(true);
        setOpenAlertDialog(true);
        setFormData(initialFormValues);
        setFormValid(false);
      }
    } else if(mode === "UPDATE") {
      if(response.error) {
        setUserUpdateError(true);
        setOpenAlertDialog(true);
        setFormValid(false);
      } else if(response.status === 201) {
        setUserUpdateSuccess(true);
        setOpenAlertDialog(true);
        setUserUpdateWarning(false);
        setMode("READ");
        setFormValid(false);
      }
    }
  }

  /** Fetches user info from BE when mode = READ only.
     *  @param response API call response object.
    */
  function fetchUserInfoApiResponse(response) {
    if(response.error) {
      setUserReadError(true);
      setFormValid(false);
    } else if(response.data) {
      setFormData(initialFormValues);
      setFormData(response.data.data.data);
      setFormValid(false);
    }
  }

  /** Handles dialog close action. */
  const handleDialogClose = ()=> {
    setOpenAlertDialog(false);
  };

  /** Handles alert dialog reject action. */
  const handleReject = ()=> {
    console.log("handleReject");
    setApproveFlag(false);
    setOpenAlertDialog(false);
  };

  /** Handles alert dialog approve action. */
  const handleApprove = ()=> {
    console.log("handleApprove");
    setApproveFlag(true);
    setOpenAlertDialog(false);
  };

  /** Opens Alert dialog when UPDATE button is clicked. */
  function updateUserDetails() {
    setApproveFlag(false);
    setUserUpdateWarning(true);
    setOpenAlertDialog(true);
  }

  return (
    <Container>
      {userCreateSuccess && <AlertDialog 
        type="success" 
        open={openDialog} 
        handleClose={handleDialogClose} 
        subtitle="Successful" 
        message="User is created successfully" 
        icon="task_alt"
        sx={{ display: "flex", flexDirection: "column", m: "auto", width: "fit-content" }}
        approveBtn='Ok'
        handleApprove={handleApprove}>
      </AlertDialog>}
            
      {userCreateError && <AlertDialog 
        type="error" 
        open={openDialog} 
        handleClose={handleDialogClose} 
        subtitle="We're Sorry..." 
        message="User creation failed!" 
        icon="error"
        sx={{ display: "flex", flexDirection: "column", m: "auto", width: "fit-content" }}
        approveBtn='Try Again'
        handleApprove={handleApprove}>
      </AlertDialog>}

      {userReadError && <AlertDialog 
        type="error" 
        open={openDialog} 
        handleClose={handleDialogClose} 
        subtitle="We're Sorry..." 
        message="Cannot read user details!" 
        icon="error"
        sx={{ display: "flex", flexDirection: "column", m: "auto", width: "fit-content" }}
        approveBtn='Try Again'
        handleApprove={handleApprove}>
      </AlertDialog>}

      {userUpdateWarning && <AlertDialog 
        type="warning" 
        open={openDialog} 
        handleClose={handleDialogClose} 
        subtitle="Warning" 
        message="Are you sure you want to update the details?" 
        icon="warning"
        sx={{ display: "flex", flexDirection: "column", m: "auto", width: "fit-content" }}
        rejectBtn='Cancel'
        approveBtn='Yes'
        handleReject={handleReject}
        handleApprove={handleApprove}>
      </AlertDialog>}

      {userUpdateSuccess && <AlertDialog 
        type="success" 
        open={openDialog} 
        handleClose={handleDialogClose} 
        subtitle="Successful" 
        message="User details updated successfully!" 
        icon="task_alt"
        sx={{ display: "flex", flexDirection: "column", m: "auto", width: "fit-content" }}
        approveBtn='Ok'
        handleApprove={handleApprove}>
      </AlertDialog>}

      {userUpdateError && <AlertDialog 
        type="error" 
        open={openDialog} 
        handleClose={handleDialogClose} 
        subtitle="We're Sorry..." 
        message="User details updation failed!" 
        icon="error"
        sx={{ display: "flex", flexDirection: "column", m: "auto", width: "fit-content" }}
        approveBtn='Try Again'
        handleApprove={handleApprove}>
      </AlertDialog>}

      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1> Users - {mode === "CREATE" ? "New" : params.id } </h1>
        {mode === "READ" && <Button variant="contained" style={{height: "40px", marginTop: "20px", cursor: "pointer"}} className="primary-button" onClick={() => {setMode("UPDATE"); setUserUpdateSuccess(false);}}> Edit </Button>}
      </div>

      <p>Required Details</p>
      <Box component="form" onSubmit={submitForm} className="user-form" autoComplete="off" 
        sx={{"& .MuiTextField-root": { m: 1, width: "35ch" }}}>

        <Input 
          name="first_name"
          label="First Name *"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
          InputProps={mode === "READ" ? {readOnly: true} : {}}
          variant={mode === "READ" ? "filled" : "outlined"}
        />
        <Input
          name="last_name"
          label="Last Name *"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.last_name}
          InputProps={mode === "READ" ? {readOnly: true} : {}}
          variant={mode === "READ" ? "filled" : "outlined"}
        />
        <Input 
          name="email"
          label="Email *"
          type="text"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          InputProps={mode === "READ" ? {readOnly: true} : {}}
          variant={mode === "READ" ? "filled" : "outlined"}
        />

        { mode === "CREATE" &&  
                    <Stack spacing={2} direction="row"  style={{marginTop: "1em"}}>
                      <Button type='submit' variant="contained"> Add</Button>
                      <Button variant="outlined" onClick={()=> navigate("/main/users")}> Cancel</Button>
                    </Stack>
        }
        { mode === "UPDATE" &&
                    <Stack spacing={2} direction="row"  style={{marginTop: "1em"}}>
                      <Button type='submit' variant="contained" onClick={()=> updateUserDetails()}> UPDATE</Button>
                      <Button variant="outlined" onClick={()=> setMode("READ")}> Cancel</Button>
                    </Stack>
        }
      </Box>
            
      {formValid && mode === "CREATE" && <PostData url={URL.users()} data={formData} sendResponse={submitFormApiCallResponse} /> }
      {formValid && mode === "UPDATE" && approveFlag && <PostData url={URL.user(params.id)} data={formData} sendResponse={submitFormApiCallResponse} /> }
      {mode === "READ" && <GetData url={URL.user(params.id)} params="" sendResponse={fetchUserInfoApiResponse}/>}
    </Container>
  );
}

export default UserEditor;