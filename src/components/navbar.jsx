import React from "react";
import { useNavigate } from "react-router-dom";
import { removeSession } from "../auth/auth";
import { Link } from "react-router-dom";

export default function NavBar({ toggleSidebar, userName, isOpen }) {
    const navigate = useNavigate();
    function logout(){
        removeSession();
        navigate("/login");
    }
  return (
    <nav
      className="navbar navbar-dark"
      style={{
        backgroundColor: "#006d77",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1100,
        marginLeft: isOpen ? "250px" : "0",
        transition: "margin 0.3s ease-in-out",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button
            className={`btn btn-link text-white me-3 btn ${isOpen ? "btn-sidebar" : "btn-navbar"}`}
            onClick={toggleSidebar}
            style={{ fontSize: "24px", textDecoration: "none" }}
          >
            &#9776;
          </button>
            <span 
                className={`navbar-brand d-flex align-items-center mb-0 h1 ${
                isOpen ? "hide-logo" : "show-logo"}`}
            >SIMPLESTOCK</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-teal text-white dropdown-toggle d-flex align-items-center"
              type="button"
              id="dropdownUser"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              
              <span>{userName || "usuario"}</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownUser"
            >
              <li>
                <Link className="dropdown-item" to="/logout" onClick={logout}>
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
