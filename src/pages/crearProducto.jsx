import React, {useEffect, useState} from "react";
import { crearProductos, listCategories, listarProductos } from "../api/productos";
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

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await listarProductos();
                console.log(data);
                setProductos(data);
            } catch (e) {
                console.error("Error al obtener productos", e);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
            setMensaje("Error al crear el producto");
        }
    };

    RouteTracker();
    if(!isLoggedIn()){
        return <Navigate to="/login" replace />;
    }
    
    if(loading) return <p>Cargando Productos...</p>;

    if(productos.length === 0) return <p>No hay productos registrados</p>

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
                <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
                    <h2>Lista de Productos</h2>
                    <table border="1" cellPadding="8" width="100%">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Barcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.description || "-"}</td>
                                    <td>${p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.category_name || "Sin categoría"}</td>
                                    <td>{p.barcode || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}