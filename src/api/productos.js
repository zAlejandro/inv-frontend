import axios from "axios";
import { getToken } from "../auth/auth";

const API = "http://localhost:4000/api";

export async function crearProductos(data) {
    const token = getToken();
    console.log(data);
    return axios.post(`${API}/products`, data, {
        headers:{
            Authorization: `bearer ${token}`
        }
    });    
}

export async function listarProductos() {
    const token = getToken();
    return axios.get(`${API}/products`, {
        headers:{
            Authorization: `bearer ${token}`
        }
    });
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