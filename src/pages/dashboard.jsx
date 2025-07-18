import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUser, isLoggedIn, removeSession, RouteTracker } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";

export default function Dashboard(){
    const navigate = useNavigate();

    const user = getUser();

    RouteTracker();
    if(!isLoggedIn()){
        return <Navigate to="/login" replace />;
    }

    function logout(){
        removeSession();
        navigate("/login");
    }

    return(
        <div>
            <MainLayout userName={user.name || "Usuario"}>
            <div>
                <h1>Bienvenido</h1>
            </div>
            </MainLayout>
        </div>
    )
}