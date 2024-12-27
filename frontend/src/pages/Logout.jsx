import React from 'react'
import Button from '@mui/material/Button';
import api from '../api';
import { useNavigate } from 'react-router-dom';
function Logout(props) {
    const {setAuthenticated} = props
    const navigate = useNavigate()
    function handleLogout(){
        api.get("/api/user/logout/")
        .then(response=>{
            alert("You're successfully logged out!")
            setAuthenticated(false)
            navigate("/login")
        })
        .catch(err=>{
            alert(err)
        })
    }

  return (
    <div>
        <h3>Are you sure you want to log out?</h3>
        <Button variant="contained" size="large" onClick={handleLogout}>
            Yes
        </Button>  
        <Button variant="outlined" size="large" onClick={()=>{navigate("/")}}>
          No
        </Button>        
    </div>
  )
}

export default Logout
