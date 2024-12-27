import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from '../api';
import {useNavigate} from "react-router-dom"

function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username:"",
        email:"",
        password:""
    })
    const [err, setErr] = useState(false)
    function handleFormChange(e){
        const {name, value} = e.target;
        setForm(prevForm=>{return {
            ...prevForm,
            [name]: value
        }})
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(form);
        api.post("/api/user/register/", {
            "username": form.username,
            "password": form.password,
            "email": form.email,
        })
        .then(response=>{
            alert("You created a user!")
            navigate("/login")
        })
        .catch(err=>{
            console.log(err)
            setErr(true);
            setTimeout(()=>{setErr(false)}, 3000)
        })
    }
  return (
    <div className='registerPage'>
      <form onSubmit={handleSubmit}>
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
        <Button variant="contained" type='submit'>Register</Button>
      </form>
    </div>
  )
}

export default Register
