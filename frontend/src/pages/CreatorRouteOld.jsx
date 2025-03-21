import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import updateAccessToken from '../apiUpdateAccess';

function CreatorRoute({ authenticated, creator, children, setAuthenticated }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAccessToken() {
      const access_token_expiration = sessionStorage.getItem("access_token_expiration");
      if (!access_token_expiration) {
        console.log("No access token expiration found — redirecting to login");
        navigate("/login");
        return;
      }

      const now = new Date();
      const expiration = new Date(access_token_expiration);
      if (expiration <= now) {
        const updated = await updateAccessToken();
        if (!updated) {
          await setAuthenticated(false)
          sessionStorage.clear()
          navigate("/login");
          return;
        } else {
          console.log("Access token updated!");
        }
      }
    }

    async function validateAccess() {
      if (!authenticated) {
        console.log("User not authenticated — redirecting to login");
        navigate("/login");
        return;
      } else if (!creator) {
        console.log("User is not a creator — redirecting to subscription plan");
        navigate("/creator/subscription_plan/");
        return;
      }
      await checkAccessToken();
      setLoading(false);
    }

    validateAccess();
  }, [authenticated, creator, navigate]);

  // Ensure nothing renders while validation is in progress
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children only if all checks are passed
  return <div>{children}</div>;
}

export default CreatorRoute;
