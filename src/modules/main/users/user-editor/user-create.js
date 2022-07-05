import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import Input from '../../../../shared-components/controls/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Button, Alert} from '@mui/material';
import URL from '../../../../utils/url';
import PostData from '../../../../core/post-data';
import { useNavigate, useLocation } from 'react-router-dom';

function UserEditor() {
    let navigate = useNavigate();
    const search = useLocation().search;

    const initialFormValues = {
        firstname: "",
        lastname: "",
        email: ""
    };

    // const [isEditable, setIsEditable] = useState(true);
    const [mode, setMode] = useState(null);
    const [formData, setFormData] = React.useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [formValid, setFormValid] = useState(false);
    const [userCreateSuccess, setUserCreateSuccess] = useState(false);
    const [userCreateError, setUserCreateError] = useState(false);

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
        temp.firstname = formData.firstname ? "" : "First Name is mandatory field.";
        temp.lastname = formData.lastname ? "" : "Last Name is mandatory field.";
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
    function apiCallResponse(response) {
        if(response.error) {
            setUserCreateError(true);
            setFormData(initialFormValues);
            setFormValid(false);
        } else if(response.data) {
            setUserCreateSuccess(true);
            setFormData(initialFormValues);
            setFormValid(false);
        }
    }

    // On Cancel Add user navigates to users list
    function cancelAdd() {
        navigate('/main/users');
    }

    return (
        <Container>
            {userCreateSuccess && <Alert severity="success">User create successful!</Alert>}
            {userCreateError && <Alert severity="error">User create failed!</Alert>}
            <h1> {mode === 'CREATE' ? 'Create' : 'Update'} user </h1>
            
            <p>Required Details</p>
            <Box component="form" onSubmit={submitForm} className="user-form" autoComplete="off" 
                sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }}}>

                <Input 
                    name="firstname"
                    label="First Name *"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    error={errors.firstname}
                    id={mode === 'CREATE' ? 'outlined-required' : 'filled-read-only-input'}
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
                <Stack spacing={2} direction="row">
                    <Button type='submit' variant="contained">Add</Button>
                    <Button variant="outlined" onClick={cancelAdd}>Cancel</Button>
                </Stack>
            </Box>
            {formValid && <PostData url={URL.users()} data={formData} sendResponse={apiCallResponse} /> }
        </Container>
    );
}

export default UserEditor;