import axios from "axios";
import { getRefreshToken, getToken, getUser, removeSession, setSession } from "../auth/auth";

const API = "http://localhost:4000/api";

export function login(email, password, stayLoggedIn){
    return axios.post(`${API}/login`, {email, password, stayLoggedIn});
}

export function mensaje(){
    return axios.get(`${API}/mensaje`);
}

export const getUserInfo = async () => {
    const token = getToken();

    if(!token){
        throw new Error("No token");
    }

    const response = await axios.get(`${API}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

    return response.data;
}

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if(!refreshToken){
        removeSession();
        return null;
    }

    try {
        const res = await axios.post(`${API}/refresh`, {
            refreshToken,
        });

        const {newAccessToken} = res.data;
        console.log(newAccessToken)

        const payload = JSON.parse(atob(newAccessToken.split(".")[1]));

        const userData = {
            user_id: payload.user_id,
            tenant_id: payload.tenant_id,
            role: payload.role,
            name: payload.name
        };

        setSession(newAccessToken, userData, refreshToken, true);

        return newAccessToken;
    } catch (e) {
        console.log(`Hubo un error: ${e}`)
        removeSession();
        return null;
    }
}