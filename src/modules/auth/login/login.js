
import { Alert, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Input from '../../../shared-components/controls/Input';
import LoadingSpinner from '../../../shared-components/loading-spinner/loading-spinner';
import ValidationService from '../../../core/validation-service';
import { PATTERNS } from '../../../core/constants';

function Login() {
    
    const initialFormValues = {
        email: "",
        password: ""
    };

    //Handle user form input 
    const [formData, setFormData ] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = ((e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validate();
    });

    const validate = () => {
        let temp = {};
        temp.email = formData.email ? ValidationService.pattern(formData.email,PATTERNS.email,"Email") : null;
        temp.password = formData.password ? ValidationService.pattern(formData.password,PATTERNS.password,"Password"): null;
        setErrors({
        ...temp
        });
        return Object.values(temp).every(val => val === null);
    }

    //Submit Data to MockAPI
    function submitForm(event) { 
        event.preventDefault();
        if(!validate()){
            return;
        }
        setIsLoading(true);
        axios.post('https://jsonplaceholder.typicode.com/posts', formData)
        .then(res => {
            setLoginSuccess(true);
            setIsLoading(false);
            setFormData({});
        })
        .catch(error => {
            console.log("Do something with error");
            setIsLoading(false);
        })
    }

    return (
        <Container> 
            {isLoading && <LoadingSpinner />}
            {loginSuccess && <Alert severity="success">Login successful!</Alert>}
            <h1> Login </h1>
            <form onSubmit={submitForm} className="form" autoComplete="off">
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
        </Container>
    );
}

export default Login;
