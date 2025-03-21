import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import updateAccessToken from '../apiUpdateAccess.js';

function ProtectedRoute({ children, authenticated, setAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!authenticated) {
            console.log("Unauthorized — redirecting to login");
            setAuthenticated(false);
            sessionStorage.clear();
            navigate("/login");
            return;
        }
        else {setLoading(false)}
    }, [authenticated, location.pathname, setAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return !loading&&<div>{children}</div>;
}

export default ProtectedRoute;
