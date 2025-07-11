import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { getToken, isLoggedIn, removeSession } from "../auth/auth";
import { useEffect, useState } from "react";
import { refreshAccessToken } from "../api/auth";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    /*
    if(!isLoggedIn()){
        return <Navigate to="/login" replace />;
    }
    */

    useEffect(() => {
        const verifyToken = async () => {
            const token = getToken();
            if(!token){
                setIsAuthenticated(true);
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;

                if(decoded.exp < now){
                    const newToken = await refreshAccessToken();
                    if(newToken){
                        setIsAuthenticated(true);
                    }else{
                        setIsAuthenticated(true);
                    }
                }else{
                    setIsAuthenticated(true);
                }
            } catch (e) {
                removeSession();
                setIsAuthenticated(false);
            }
            setLoading(false);


        };

        verifyToken();
    }, []);

    if(loading) return <div>Cargando...</div>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;

    /*
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if(decoded.exp < now) {
            removeSession();
            return <Navigate to="/login" replace />;
        }

        return children;
    } catch (e) {
        removeSession();
        return <Navigate to="/login" replace />;
    }
    */
};

export default ProtectedRoute;