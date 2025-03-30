import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import updateAccessToken from '../apiUpdateAccess.js';
import { AuthContext } from '../AuthContext.js';

function ProtectedRoute({ children}) {
    const {authenticated, setAuthenticated} = useContext(AuthContext);
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

    return <div>{children}</div>;
}

export default ProtectedRoute;
