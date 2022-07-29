import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import Input from "../../../../shared-components/controls/Input";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {Button, Alert} from "@mui/material";
import URL from "../../../../utils/url";
import PostData from "../../../../core/post-data";
import GetData from "../../../../core/fetch-data";
import { useNavigate, useParams } from "react-router-dom";

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
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [userUpdateError, setUserUpdateError] = useState(false);

  useEffect(()=> {
    function setFormMode() {
      params.id === "new" ? setMode("CREATE") : setMode("READ");
    }
    setFormMode();
  }, [params]);

  //Handle user form input 
  function handleChange(event) {
    const {name, value} = event.target;
    setFormData((prevFormData)=> {
      return {
        ...prevFormData,
        [name]: value
      }
    });
    validate();
  }

  const emailValidator =  (email) => {
    if (email === "") {
      return "Email is mandatory field."
    }

    if (!(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email)) {
      return "Email is not valid."
    }
    return "";
  }

  //Validate form input fields
  const validate = () => {
    let temp= {};
    temp.first_name = formData.first_name ? "" : "First Name is mandatory field.";
    temp.last_name = formData.last_name ? "" : "Last Name is mandatory field.";
    temp.email = emailValidator(formData.email);

    setErrors({
      ...temp 
    });

    return Object.values(temp).every(val => val === "");
  }

  //Mark form validation status
  function submitForm(event) {
    event.preventDefault();
    if(!validate()){
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }

  //handle callback from api handler 
  function submitFormApiCallResponse(response) {
    console.log(mode)
    if(mode === "CREATE") {
      if(response.error) {
        setUserCreateError(true);
        setFormData(initialFormValues);
        setFormValid(false);
      } else if(response.data) {
        setUserCreateSuccess(true);
        setFormData(initialFormValues);
        setFormValid(false);
      }
    } else if(mode === "UPDATE") {
      if(response.error) {
        setUserUpdateError(true);
        setFormValid(false);
      } else if(response.status === 201) {
        setUserUpdateSuccess(true);
        setMode("READ");
        setFormValid(false);
      }
    }
  }

  function fetchUserInfoApiResponse(response) {
    if(response.error) {
      setUserReadError(true)
    } else if(response.data) {
      setFormData(initialFormValues);
      setFormData(response.data.data.data);
    }
  }

  return (
    <Container>
      {userCreateSuccess && <Alert severity="success">User create successful!</Alert>}
      {userCreateError && <Alert severity="error">User create failed!</Alert>}
      {userReadError && <Alert severity="error">Cannot read user details!</Alert>}
      {userUpdateSuccess && <Alert severity="success">User updated successfully!</Alert>}
      {userUpdateError && <Alert severity="error">User details updation failed!</Alert>}

      <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1> Users - {mode === "CREATE" ? "New" : params.id } </h1>
        {mode === "READ" && <Button variant="contained" style={{height: "40px", marginTop: "20px", cursor: "pointer"}} className="primary-button" onClick={() => {setMode("UPDATE"); setUserUpdateSuccess(false)}}> Edit </Button>}
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
                      <Button type='submit' variant="contained"> UPDATE</Button>
                      <Button variant="outlined" onClick={()=> setMode("READ")}> Cancel</Button>
                    </Stack>
        }
      </Box>
            
      {formValid && mode === "CREATE" && <PostData url={URL.users()} data={formData} sendResponse={submitFormApiCallResponse} /> }
      {formValid && mode === "UPDATE" && <PostData url={URL.user(params.id)} data={formData} sendResponse={submitFormApiCallResponse} /> }
      {mode === "READ" && <GetData url={URL.user(params.id)} params="" sendResponse={fetchUserInfoApiResponse}/>}
    </Container>
  );
}

export default UserEditor;