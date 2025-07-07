import axios from "axios";

const API = "https://inv-backend-vun0.onrender.com/api";

export function login(email, password){
    return axios.post(`${API}/login`, {email, password});
}

export function mensaje(){
    return axios.get(`${API}/mensaje`);
}