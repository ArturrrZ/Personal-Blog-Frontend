import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatorRoute({ authenticated, creator, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else if (!creator) {
      navigate("/creator/subscription_plan/");
    }
  }, [authenticated, creator, navigate]);

  // Пока идет редирект, ничего не рендерим
  if (!authenticated || !creator) {
    return null;
  }

  return <div>{children}</div>;
}

export default CreatorRoute;
