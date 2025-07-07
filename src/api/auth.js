import axios from "axios";

const API = "http://localhost:4000/api";

export function login(email, password){
    return axios.post(`${API}/login`, {email, password});
}