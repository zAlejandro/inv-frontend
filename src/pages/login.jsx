import { useState } from "react";
import { login } from "../api/auth";
import { isLoggedIn, setSession } from "../auth/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    if(isLoggedIn()){
        return <Navigate to="/dashboard" replace />;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await login(email, password);
            const { token } = res.data;

            const payload = JSON.parse(atob(token.split(".")[1]));

            const userData = {
                user_id: payload.user_id,
                tenant_id: payload.tenant_id,
                role: payload.role,
                name: payload.name
            };

            setSession(token, userData);
            navigate("/dashboard");
        } catch (err) {
            alert("Login incorrecto");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>LOGIN</h2>
            <input 
                type="email"
                placeholder="CORREO"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input 
                type="password"
                placeholder="CONTRASEÑA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
    )
}