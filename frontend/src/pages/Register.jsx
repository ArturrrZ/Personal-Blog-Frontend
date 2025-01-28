import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../api';
import {useNavigate} from "react-router-dom"
import { Alert } from '@mui/material';


function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username:"",
        email:"",
        password:""
    })
    const [err, setErr] = useState(false)
    const [improperEmail, setImproperEmail] = useState(false);
    const [finish, setFinish] = useState(false);
    function checkEmailPattern(email){
        const pattern = /.+@.+\..+$/;
        return  pattern.test(email)
    }
    function handleFormChange(e){
        const {name, value} = e.target;
        setForm(prevForm=>{return {
            ...prevForm,
            [name]: value
        }})
    }
    async function handleSubmit(e){
        e.preventDefault();
        const properEmail = await checkEmailPattern(form.email);
        if (!properEmail) {
            setImproperEmail(true)
            setTimeout(()=>{setImproperEmail(false)}, 3000)
            return 1
        }
        console.log(form);
        api.post("/api/user/register/", {
            "username": form.username,
            "password": form.password,
            "email": form.email,
        })
        .then(response=>{
            setFinish(true)
            setTimeout(()=>{navigate("/login")}, 3000)            
        })
        .catch(err=>{
            console.log(err)
            setErr(true);
            setTimeout(()=>{setErr(false)}, 3000)
        })
    }
  return (
    <div className='registerPage'>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField 
        error={err}
        id="standard-basic" 
        label="Username" 
        name='username'
        value={form.username}
        onChange={handleFormChange}
        required    
        />
        <br/>
        <TextField 
        error={err}
        id="standard-basic" 
        label="Email" 
        name='email'
        value={form.email}
        onChange={handleFormChange}
        helperText="e.g. email@email.com"
        required    
        />
        {improperEmail&&<Alert severity="error">Please use a proper email pattern.</Alert>}
        <br/>
        <TextField
        id="outlined-password-input"
        error={err}
        label="Password"
        name='password'
        type="password"
        value={form.password}
        onChange={handleFormChange}
        required
        />
        <br/>
        {err&&<p style={{color:'red'}}>
            User with this email/username is already exist.
        </p>}
        <Button variant="contained" type='submit' disabled={improperEmail}>Register</Button>
        {finish&&<Alert severity="success">You created a user!</Alert>}
      </form>
    </div>
  )
}

export default Register
