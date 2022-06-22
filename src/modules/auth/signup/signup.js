import LoadingSpinner from '../../../shared-components/loading-spinner/loading-spinner';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import React, {useState} from 'react';
import axios from 'axios';
import './signup.css';
import Input from '../../../shared-components/controls/Input';

function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [ errors, setErrors] = useState({});

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

    function submitForm(event) {
        event.preventDefault();
        if(!validate()){
            return;
        }
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
            {/* <TextField label="First Name *" variant="outlined" placeholder='First Name' name='firstname' value={formData.firstname} onChange={handleChange} />
            <TextField label="Last Name *" variant="outlined" placeholder='Last Name' name='lastname' value={formData.lastname} onChange={handleChange} />
            <TextField label="Email *" variant="outlined" placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
            <TextField label="Password *" type="password" placeholder='Password'  name='password' value={formData.password} onChange={handleChange}/>
             */}
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
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />
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
