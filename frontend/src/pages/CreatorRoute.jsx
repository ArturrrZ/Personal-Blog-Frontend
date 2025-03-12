import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import updateAccessToken from '../apiUpdateAccess';


function CreatorRoute({ authenticated, creator, children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    async function checkAccessToken() {
      const access_token_expiration = sessionStorage.getItem("access_token_expiration")
      const now = new Date();
      const expiration = new Date(access_token_expiration)
      if (expiration <= now) {
        const updated = await updateAccessToken();
        if (!updated) {navigate("/login")}
        else {console.log("access token is updated!!!")}
        
      }
      setLoading(false)

    }
    if (!authenticated) {
      navigate("/login");
      setLoading(false)
      return;
    } else if (!creator) {
      navigate("/creator/subscription_plan/");
      setLoading(false)
      return;
    }
    checkAccessToken()
  }, [authenticated, creator, navigate]);

  // Пока идет редирект, ничего не рендерим
  if (!authenticated || !creator) {
    return null;
  }

  return !loading ? <div>{children}</div> : null;
}

export default CreatorRoute;
