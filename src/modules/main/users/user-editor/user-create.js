import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import Input from '../../../../shared-components/controls/Input';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import URL from '../../../../utils/url';
import PostData from '../../../../core/post-data';
import GetData from '../../../../core/fetch-data';
import { useNavigate, useParams } from 'react-router-dom';
import AlertDialog from '../../../../shared-components/dialog/alert-dialog';

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
    const [userUpdateWarning, setUserUpdateWarning] = useState(false);
    const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
    const [userUpdateError, setUserUpdateError] = useState(false);
    const [openDialog, setOpenAlertDialog] = useState(false);
    const [approveFlag, setApproveFlag] = useState(false);

    useEffect(()=> {
        function setFormMode() {
            params.id === "new" ? setMode("CREATE") : setMode("READ");
        }
        setFormMode();
    }, [params]);

    //Handle user form input 
    function handleChange(event) {
        event.preventDefault();
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

    // Validate form input fields
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

    // Marks form validation status
    function submitForm(event) {
        event.preventDefault();
        if(!validate()){
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }

    /** Handles CREATE & UPDATE API callback response. */
    function submitFormApiCallResponse(response) {
        console.log(mode)
        if(mode === "CREATE") {
            if(response.error) {
                setUserCreateError(true);
                setOpenAlertDialog(true);
                setFormData(initialFormValues);
                setFormValid(false);
            } else if(response.data) {
                setUserCreateSuccess(true);
                setOpenAlertDialog(true);
                setFormData(initialFormValues);
                setFormValid(false);
            }
        } else if(mode === "UPDATE") {
            console.log(userUpdateWarning, "userUpdateWarning")
            if(response.error) {
                setUserUpdateError(true);
                setOpenAlertDialog(true);
                setFormValid(false);
            } else if(response.status === 201) {
                setUserUpdateSuccess(true);
                setOpenAlertDialog(true);
                setMode("READ");
                setFormValid(false);
            }
        }
    }

    /** Fetches user info from BE when mode = READ only. */
    function fetchUserInfoApiResponse(response) {
        console.log(response)
        if(response.error) {
            setUserReadError(true);
            setFormValid(false);
        } else if(response.data) {
            setFormData(initialFormValues);
            setFormData(response.data.data.data);
            setFormValid(false);
        }
    }

    /** Handles dialog close action. */
    const handleDialogClose = ()=> {
        console.log("handleDialogClose");
        if(mode === "UPDATE") {
            
        }
        setOpenAlertDialog(false);
    }

    /** Handles alert dialog reject action. */
    const handleReject = ()=> {
        console.log("handleReject");
        setApproveFlag(false);
        setOpenAlertDialog(false);
    }

    /** Handles alert dialog approve action. */
    const handleApprove = ()=> {
        console.log("handleApprove");
        setApproveFlag(true);
        setOpenAlertDialog(false);
        setUserUpdateWarning(false);
    }

    /** Opens Alert dialog when UPDATE button is clicked. */
    function updateUserDetails() {
        setUserUpdateWarning(true);
        setOpenAlertDialog(true);
        setFormValid(false);
    }

    return (
        <Container>
            {userCreateSuccess && <AlertDialog 
                type="success" 
                open={openDialog} 
                handleClose={handleDialogClose} 
                subtitle="Successful" 
                message="User is created successfully" 
                icon="task_alt"
                sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
                approveBtn='Ok'>
            </AlertDialog>}
            
            {userCreateError && <AlertDialog 
                type="error" 
                open={openDialog} 
                handleClose={handleDialogClose} 
                subtitle="We're Sorry..." 
                message="User creation failed!" 
                icon="error"
                sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
                approveBtn='Try Again'>
            </AlertDialog>}

            {userReadError && <AlertDialog 
                type="error" 
                open={openDialog} 
                handleClose={handleDialogClose} 
                subtitle="We're Sorry..." 
                message="Cannot read user details!" 
                icon="error"
                sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
                approveBtn='Try Again'>
            </AlertDialog>}

            {userUpdateWarning && <AlertDialog 
                type="warning" 
                open={openDialog} 
                handleClose={handleDialogClose} 
                subtitle="Warning" 
                message="Are you sure you want to update the details?" 
                icon="warning"
                sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
                rejectBtn='Cancel'
                approveBtn='Yes'
                handleReject={handleReject}
                handleApprove={handleApprove}>
            </AlertDialog>}

            {userUpdateSuccess && <AlertDialog 
                type="success" 
                open={openDialog} 
                handleClose={handleDialogClose} 
                subtitle="Successful" 
                message="User details updated successfully!" 
                icon="task_alt"
                sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
                approveBtn='Ok'
                handleApprove={handleApprove}>
            </AlertDialog>}

            {userUpdateError && <AlertDialog 
                type="error" 
                open={openDialog} 
                handleClose={handleDialogClose} 
                subtitle="We're Sorry..." 
                message="User details updation failed!" 
                icon="error"
                sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content' }}
                approveBtn='Try Again'>
            </AlertDialog>}

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1> Users - {mode === 'CREATE' ? 'New' : params.id } </h1>
                {mode === 'READ' && <Button variant="contained" style={{height: '40px', marginTop: '20px', cursor: 'pointer'}} className="primary-button" onClick={() => {setMode('UPDATE'); setUserUpdateSuccess(false)}}> Edit </Button>}
            </div>

            <p>Required Details</p>
            <Box component="form" onSubmit={submitForm} className="user-form" autoComplete="off" 
                sx={{'& .MuiTextField-root': { m: 1, width: '35ch' }}}>

                <Input 
                    name="first_name"
                    label="First Name *"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    error={errors.first_name}
                    InputProps={mode === 'READ' ? {readOnly: true} : {}}
                    variant={mode === 'READ' ? 'filled' : 'outlined'}
                />
                <Input
                    name="last_name"
                    label="Last Name *"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    error={errors.last_name}
                    InputProps={mode === 'READ' ? {readOnly: true} : {}}
                    variant={mode === 'READ' ? 'filled' : 'outlined'}
                />
                <Input 
                    name="email"
                    label="Email *"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    InputProps={mode === 'READ' ? {readOnly: true} : {}}
                    variant={mode === 'READ' ? 'filled' : 'outlined'}
                />

                { mode === 'CREATE' &&  
                    <Stack spacing={2} direction="row"  style={{marginTop: '1em'}}>
                        <Button type='submit' variant="contained"> Add</Button>
                        <Button variant="outlined" onClick={()=> navigate('/main/users')}> Cancel</Button>
                    </Stack>
                }
                { mode === 'UPDATE' &&
                    <Stack spacing={2} direction="row"  style={{marginTop: '1em'}}>
                        <Button type='submit' variant="contained" onClick={()=> updateUserDetails()}> UPDATE</Button>
                        <Button variant="outlined" onClick={()=> setMode('READ')}> Cancel</Button>
                    </Stack>
                }
            </Box>
            
            {formValid && mode === 'CREATE' && <PostData url={URL.users()} data={formData} sendResponse={submitFormApiCallResponse} /> }
            {formValid && mode === 'UPDATE' && approveFlag && <PostData url={URL.user(params.id)} data={formData} sendResponse={submitFormApiCallResponse} /> }
            {mode === 'READ' && <GetData url={URL.user(params.id)} params="" sendResponse={fetchUserInfoApiResponse}/>}
        </Container>
    );
}

export default UserEditor;