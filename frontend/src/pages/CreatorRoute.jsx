import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import updateAccessToken from '../apiUpdateAccess';
import { AuthContext } from '../AuthContext';

function CreatorRoute({children}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {authenticated, creator, setAuthenticated} = useContext(AuthContext)
  useEffect(() => {
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
