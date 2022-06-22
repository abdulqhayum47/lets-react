import LoadingSpinner from '../../../shared-components/loading-spinner/loading-spinner';
import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, {useState} from 'react';
import axios from 'axios';
import './signup.css';

function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    /** Handles signup form input data */
    const [formData, setFormData] = React.useState({firstname: "", lastname: "", email: "", password: ""});
    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prevFormData)=> {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function submitForm(event) {
        event.preventDefault();
        console.log("Submit Data to API", formData);
        setIsLoading(true);
        axios.post('', formData).then(res => {
            console.log("Do something with response");
            setIsLoading(false)
        }).catch(error => {
            console.log("Do something with error");
            setIsLoading(false)
        });
    }

    const renderSignUpPage = <div>
        <h1> Signup </h1>
        <form onSubmit={submitForm} className="form">
            <TextField label="First Name *" variant="outlined" placeholder='First Name' name='firstname' value={formData.firstname} onChange={handleChange} />
            <TextField label="Last Name *" variant="outlined" placeholder='Last Name' name='lastname' value={formData.lastname} onChange={handleChange} />
            <TextField label="Email *" variant="outlined" placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
            <TextField label="Password *" type="password" placeholder='Password'  name='password' value={formData.password} onChange={handleChange}/>
            <Button type='submit' variant="contained"> SignUp </Button>
        </form>
    </div>

    return (
        <Container>
            {isLoading ? <LoadingSpinner /> : renderSignUpPage}
        </Container>
    );
  }

  export default SignUp;
