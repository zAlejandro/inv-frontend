import { crearProducto } from "../api/productos";

async function handleSubmit(e) {
    e.preventDefault();

    try{
        await crearProducto({
            nombre: "Coca Cola",
            precio: 12.0,
            stock: 100
        });
        alert("Producto creado");
    }catch (err){
        console.error(err);
    }
}