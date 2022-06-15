
import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import axios from 'axios';
import './login.css';

function Login() {
    
    //Handle user form input 
    const [formData, setFormData ] = React.useState({email: "", password: "" });
    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prevFormData)=> {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    //Submit Data to MockAPI
    function submitForm(event) { 
        event.preventDefault();
        console.log("Submit Data to API", formData);
        axios.post('', formData)
        .then(res => {
            console.log("Do something with response");
        })
        .catch(error => {
            console.log("Do something with error");
        })
    }

    return (
        <Container> 
            <h1> Login </h1>
            <form onSubmit={submitForm} className="form">
                <TextField label="Email" variant="outlined" placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
                <TextField label="Password" type="password" placeholder='Password'  name='password' value={formData.password} onChange={handleChange}/>
                <Button type='submit' variant="contained">Login</Button>
            </form>
        </Container>
    );
}

export default Login;
