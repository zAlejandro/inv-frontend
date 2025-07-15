import axios from "axios";
import { getRefreshToken, getToken, getUser, removeSession, setSession } from "../auth/auth";

const API = process.env.REACT_APP_API_URL;

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
        removeSession();
        return null;
    }
}