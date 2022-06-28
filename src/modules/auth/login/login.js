
import { Alert, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import './login.css';
import Input from '../../../shared-components/controls/Input';
import Validator from '../../../utils/validatior';
import { PATTERNS } from '../../../utils/constants';
import URL from '../../../utils/url';
import PostData from '../../../core/post-data';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();

    const initialFormValues = {
        email: "",
        password: ""
    };

    const [formData, setFormData ] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [formValid, setFormValid] = useState(false);

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
            setLoginError(true);
            setFormData(initialFormValues);
            setFormValid(false);
        } else if(response.data) {
            setLoginSuccess(true);
            setFormData(initialFormValues);
            setFormValid(false);
            localStorage.setItem('access_token', response.data.token);
            // window.location.href = '/main/dashboard'
            navigate('/main/dashboard');
        }
    }

    return (
        <Container> 
            {loginSuccess && <Alert severity="success">Login successful!</Alert>}
            {loginError && <Alert severity="error">Login failed!</Alert>}
            <h1> Login </h1>
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
                <Button type='submit' variant="contained">Login</Button>
            </form>
            { formValid && <PostData url={URL.login()} data={formData} sendResponse={apiCallResponse}/>}
        </Container>
        
    );
}

export default Login;
