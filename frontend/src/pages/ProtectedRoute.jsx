import React, { useEffect } from 'react';
import api from '../api.js';
import {useNavigate} from 'react-router-dom'
function ProtectedRoute({ children }) {
    const navigate = useNavigate();
  useEffect(() => {
    async function checkAuth(){
      try {
        const response = await api.get('/api/user/check-auth/');
        console.log(response.data);
      } catch (error) {
        console.log('Access token is expired');
        // REFRESH token
        api.get("/api/user/refresh_token/")
        .then(res=>{console.log(res.data)})
        .catch(err=>{navigate("/login")})
      }
    };

    checkAuth();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      {children} 
    </div>
  );
}

export default ProtectedRoute;