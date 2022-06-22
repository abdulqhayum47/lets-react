
import { Alert, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Input from '../../../shared-components/controls/Input';
import LoadingSpinner from '../../../shared-components/loading-spinner/loading-spinner';

function Login() {
    
    const initialFormValues = {
        email: "",
        password: ""
    };

    const emailValidator =  (email) => {
        if (email === "") {
            return "Email is mandatory field."
        }

        if (!(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email)) {
            return "Email is not valid."
        }
        return "";
    }

    //Handle user form input 
    const [formData, setFormData ] = useState(initialFormValues);
    const [ errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        let temp = {};
        temp.email = emailValidator(formData.email);
        temp.password = formData.password ? "" : "Password is mandatory field.";

        setErrors({
            ...temp
        });

        return Object.values(temp).every(val => val === "");
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({
                ...formData,
                [name]: value
        });

        validate();
    }

    //Submit Data to MockAPI
    function submitForm(event) { 
        event.preventDefault();
        if(!validate()){
            return;
        }
        console.log("Submit Data to API", formData);
        setIsLoading(true);
        axios.post('https://jsonplaceholder.typicode.com/posts', formData)
        .then(res => {
            setLoginSuccess(true);
            setIsLoading(false);
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
                    error={errors.email}
                />
                <Input 
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <Button type='submit' variant="contained">Login</Button>
            </form>
        </Container>
    );
}

export default Login;
