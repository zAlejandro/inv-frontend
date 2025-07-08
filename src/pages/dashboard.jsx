import { useEffect, useState } from "react";
import { getToken, getUser, isLoggedIn, removeSession } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { mensaje } from "../api/auth";

export default function Dashboard(){
    const navigate = useNavigate();

    const user = getUser();

    function logout(){
        removeSession();
        navigate("/login");
    }

    return(
        <div>
            <h1>Bienvenido</h1>
            <h2>{user?.name || "usuario"}</h2>
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    )
}