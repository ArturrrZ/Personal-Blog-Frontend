import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import updateAccessToken from '../apiUpdateAccess.js';

function ProtectedRoute({ children, authenticated, setAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    console.log("protected ROUTE")
    // console.log(loading)
    useEffect(() => {
        async function checkAccessToken() {
            const access_token_expiration = sessionStorage.getItem("access_token_expiration");

            if (!access_token_expiration) {
                console.log("No access token expiration found — redirecting to login");
                setAuthenticated(false);
                sessionStorage.clear();
                navigate("/login");
                return;
            }

            const expiration = new Date(access_token_expiration);
            const now = new Date();
            now.setSeconds(now.getSeconds() + 5);

            if (expiration <= now) {
                const updated = await updateAccessToken();
                if (!updated) {
                    console.log("Failed to refresh token — redirecting to login");
                    setAuthenticated(false);
                    sessionStorage.clear();
                    navigate("/login");
                    return;
                } else {
                    console.log("Successfully updated access token!");
                }
            }
            setLoading(false);
            // console.log("protected ROUTE USEEFFECT")
        }

        if (!authenticated) {
            console.log("Unauthorized — redirecting to login");
            setAuthenticated(false);
            sessionStorage.clear();
            navigate("/login");
            return;
        }
        checkAccessToken();
        setLoading(true);
    }, [authenticated, location.pathname, setAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return !loading&&<div>{children}</div>;
}

export default ProtectedRoute;
