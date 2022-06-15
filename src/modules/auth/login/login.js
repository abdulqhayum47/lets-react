
import React from 'react';
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
    }

    return (
        <form onSubmit={submitForm}>
            <input type="text" placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
            <input type="text" placeholder='Password'  name='password' value={formData.password} onChange={handleChange}/>
            <button type='submit'> Submit </button>
        </form>
    );
}

export default Login;
