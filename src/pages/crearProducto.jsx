import React, {useEffect, useState} from "react";
import { crearProductos, listCategories } from "../api/productos";
import { RouteTracker } from "../auth/auth";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/auth";

export default function CrearProducto(){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        barcode: "",
        category_id: "",
        stock: "",
    });

    const [categories, setCategories] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await listCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error cargando categorías", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock, 10),
                category_id: formData.category_id,
            };
            console.log(data);
            await crearProductos(data);
            setMensaje("Producto creado correctamente.");

            setFormData({
                name: "",
                description: "",
                price: "",
                barcode: "",
                category_id: "",
                stock: "",
            })
        } catch (err) {
            console.error(err);
            setMensaje("Error al crear el producto");
        }
    };

    RouteTracker();
    if(!isLoggedIn()){
        return <Navigate to="/login" replace />;
    }

    return(
        <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
            <h2>Crear Producto</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                />
                <br />

                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción"
                />
                <br />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    step="0.01"
                    required
                />
                <br />

                <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    placeholder="Código de barras"
                />
                <br />
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccionar categoría --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <br />

                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                />
                <br />

                <button type="submit">Guardar Producto</button>
            </form>
        </div>
    );
}