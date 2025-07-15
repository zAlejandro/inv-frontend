import axios from "axios";
import { getToken } from "../auth/auth";

const API = process.env.REACT_APP_API_URL;

export async function crearProductos(data) {
    const token = getToken();
    return axios.post(`${API}/products`, data, {
        headers:{
            Authorization: `bearer ${token}`
        }
    });    
}

export async function listarProductos() {
    const token = getToken();

    const res = await axios.get(`${API}/products`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}

export async function listCategories() {
    const token = getToken();

    const res = await axios.get(`${API}/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}