import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./pages/protectedRoute";
import CrearProducto from "./pages/crearProducto";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login/>}/>
        <Route 
          path="/productos" 
          element=
          {
            <ProtectedRoute>
              <CrearProducto/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
