import React, { useEffect, useState } from 'react';
import api from '../api.js';
import {useNavigate, Navigate} from 'react-router-dom'
import updateAccessToken from '../apiUpdateAccess.js'



function ProtectedRoute({ children, authenticated }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
    async function checkAccessToken(){
      const access_token_expiration = sessionStorage.getItem("access_token_expiration");
      if (!access_token_expiration) {
        console.log("No access token expiration found — redirecting to login");
        navigate("/login");
        return;
      }
      const expiration = new Date(access_token_expiration);
      const now = new Date();
      if (expiration <= now) {
          const updated = await updateAccessToken();
          if (!updated) {
            navigate("/login")
          }
          else {console.log("successfully updated access token!!!")}
      }
      setLoading(false)
    }

    if (!authenticated) {
      console.log("unuthorized")
      navigate("/login")
    }
    checkAccessToken()
   
  }, [authenticated])

  return !loading ? <div>{children}</div> : null;
}

export default ProtectedRoute;