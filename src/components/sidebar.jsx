import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SideBar({ isOpen, onClose }) {
  return (
    <div
      className="bg-dark text-white position-fixed top-0 start-0 vh-100 p-3"
      style={{
        width: "250px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        overflowY: "auto",
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        zIndex: 1050,
      }}
    >
    {/* LOGO + APP NAME */}
    <div className={`d-flex align-items-center mb-3`}>
        <span
            className="fs-4 fw-bold"
            style={{ whiteSpace: "nowrap" }}
          >
            SIMPLESTOCK
          </span>
    </div>
    {/* LINEA DIVISORIA */}
    {isOpen && (
        <hr
          style={{
            borderColor: "#6c757d",
            opacity: 0.3
          }}
        />
    )}
    <ul className="nav flex-column mb-auto">
        <li className="nav-item">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link text-white"
            }>Dashboard</NavLink>
        </li>
        <li className="nav-item">
            <NavLink
                to="/productos"
                className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link text-white"
            }>Productos</NavLink>
        </li>
        <li>
          <a href="/categorias" className="nav-link text-white">
            <i className="bi bi-tags me-2"></i>
            {isOpen && "Categorías"}
          </a>
        </li>
      </ul>
    </div>
  );
}