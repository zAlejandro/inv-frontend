import axios from "axios";
import { getRefreshToken, getToken, getUser, removeSession, setSession } from "../auth/auth";

const API = "https://inv-backend-vun0.onrender.com/api";

export function login(email, password){
    return axios.post(`${API}/login`, {email, password});
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

        const newToken = res.data.token;

        setSession(newToken, refreshToken, getUser(), true);

        return newToken;
    } catch (e) {
        console.error("Error Refreshing Token: ", e);
        removeSession();
        return null;
    }
}