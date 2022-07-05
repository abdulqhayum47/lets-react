import { Button, Alert } from '@mui/material';
import { Container } from '@mui/system';
import React, {useState } from 'react';
import './signup.css';
import Input from '../../../shared-components/controls/Input';
import PostData from '../../../core/post-data';
import URL from '../../../utils/url';

function SignUp() {

    const initialFormValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    };

    const [formData, setFormData] = React.useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [signupSuccess, setSignUpSuccess] = useState(false);
    const [signupError, setSignupError] = useState(false);
    const [formValid, setFormValid] = useState(false);

    /** Handles signup form input data */
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
    
    const validate = () => {
        let temp = {};
        temp.firstname = formData.firstname ? "" : "First Name is mandatory field.";
        temp.lastname = formData.lastname ? "" : "Last Name is mandatory field.";
        temp.email = emailValidator(formData.email);
        temp.password = formData.password ? "" : "Password is mandatory field.";

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
    function apiCallResponse(response) {
        if(response.error) {
            setSignupError(true);
            setFormData(initialFormValues);
            setFormValid(false);
        } else if(response.data) {
            setSignUpSuccess(true);
            setFormData(initialFormValues);
            setFormValid(false);
        }
    }

    return (
        <Container>
            {signupSuccess && <Alert severity="success">SignUp successful!</Alert>}
            {signupError && <Alert severity="error">SignUp failed!</Alert>}
            <h1> Signup </h1>
            <form onSubmit={submitForm} className="signup-form" autoComplete="off">
                <Input 
                    name="firstname"
                    label="First Name *"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    error={errors.firstname}
                />
                <Input 
                    name="lastname"
                    label="Last Name *"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    error={errors.lastname}
                />
                <Input 
                    name="email"
                    label="Email *"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input 
                    name="password"
                    label="Password *"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <Button type='submit' variant="contained"> SignUp </Button>
            </form>
            {formValid && <PostData url={URL.signup()} data={formData} sendResponse={apiCallResponse} /> }
        </Container>
    );
  }

  export default SignUp;
