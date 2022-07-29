
import { Alert, Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./login.css";
import Input from "../../../shared-components/controls/Input";
import Validator from "../../../utils/validatior";
import { PATTERNS } from "../../../utils/constants";
import URL from "../../../utils/url";
import PostData from "../../../core/post-data";
import { useNavigate } from "react-router-dom";
import SnackbarHandler from "../../../utils/snackbar";

function Login() {
  let navigate = useNavigate();

  const initialFormValues = {
    email: "",
    password: ""
  };

  const [formData, setFormData ] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [snackBarConfig, setSnackBarConfig] = useState(null);

  //Handle user form input 
  const handleChange = ((e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validate();
  });

  //validate form
  const validate = () => {
    let temp = {};
    temp.email = formData.email ? Validator.pattern(formData.email,PATTERNS.email,"Email") : null;
    temp.password = formData.password ? Validator.pattern(formData.password,PATTERNS.password,"Password"): null;
    setErrors({
      ...temp
    });
    return Object.values(temp).every(val => val === null);
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
  function apiCallResponse(response) {
    if(response.error) {
      setFormData(initialFormValues);
      setFormValid(false);
      setSnackBarConfig({message: response.error.message || "Login Failed", type: "error"});
    } else if(response.data) {
      setSnackBarConfig({message: response.data.message || "Successfully Logged in", type: "success"});
      setFormData(initialFormValues);
      setFormValid(false);
      localStorage.setItem("access_token", response.data.token);
      navigate("/main/dashboard");
    }
  }

  return (
    <Container> 
      <h1 className='login-heading'> Login </h1>
      <form onSubmit={submitForm} className="login-form" autoComplete="off">
        <Input 
          name="email"
          label="Email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          onBlur={validate}
          error={errors.email}
        />
        <Input 
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={validate}
          error={errors.password}
        />
        <Button type='submit' style={{width: "100%"}} variant="contained">Login</Button>
      </form>
      { formValid && <PostData url={URL.login()} data={formData} sendResponse={apiCallResponse}/>}
      { snackBarConfig && <SnackbarHandler message={snackBarConfig.message} type={snackBarConfig.type}/> }
    </Container>
        
  );
}

export default Login;
