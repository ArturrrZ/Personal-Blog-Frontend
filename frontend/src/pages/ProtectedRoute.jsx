import React, { useEffect } from 'react';
import api from '../api.js';
import {useNavigate, Navigate} from 'react-router-dom'
function ProtectedRoute({ children, authenticated }) {
    const navigate = useNavigate();
  // useEffect(() => {
  //   async function checkAuth(){
  //     try {
  //       const response = await api.get('/api/user/check-auth/');
  //       console.log(response.data);
  //       sessionStorage.setItem('username', response.data.user)
  //       sessionStorage.setItem('is_creator', response.data.is_creator)
  //       sessionStorage.setItem('is_authenticated', response.data.is_authenticated)
  //     } catch (error) {
  //       console.log('Access token is expired');
  //       // REFRESH token
  //       api.get("/api/user/refresh_token/")
  //       .then(res=>{console.log(res.data)})
  //       .catch(err=>{
  //         // alert("You need to be logged in!")
  //         navigate("/login")})
  //     }
  //   };

  //   checkAuth();
  // }, []); // Empty dependency array ensures this runs once on mount
  useEffect(()=>{
    if (!authenticated) {
      console.log("unuthorized")
      navigate("/login")
    }
  }, [authenticated])

  return authenticated ? <div>{children}</div> : null;
}

export default ProtectedRoute;