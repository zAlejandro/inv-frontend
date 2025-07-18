import React, {useEffect, useState} from "react";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";

export default function MainLayout({children, userName}) {
    const [sideBarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sideBarOpen);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768){
                setSidebarOpen(false);
            }else{
                setSidebarOpen(true);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
    }, []);

    return(
        <>
            <NavBar toggleSidebar={toggleSidebar} userName={userName} isOpen={sideBarOpen}/>
            <SideBar isOpen={sideBarOpen} onClose={closeSidebar}/>
            <style>
                {`
                    .show-logo {
                        opacity: 1;
                        transform: translateX(50);
                        transition: all 0.3s ease;
                        pointer-events: auto;
                    }
                    .hide-logo {
                        opacity: 0;
                        transform: translateX(-50px);
                        transition: all 0.3s ease;
                        pointer-events: none;
                    }
                    .btn-navbar {
                        background-color: #006D77;
                        transform: translateX(0px);
                        transition: all 0.3s ease;
                    }

                    .btn-sidebar {
                        background-color: #212529; /* color del sidebar */
                        transform: translateX(-70px);
                        transition: all 0.3s ease;
                    }

                    .nav-link.active {
                    background-color:rgb(86, 95, 100);
                    color: #fff;
                    border-radius: 0.375rem;
                    border-left: 4px solid #ffc107; /* amarillo */
                    padding-left: 12px;
                    font-weight: bold;
                    }
                `}
            </style>
            <main
                style={{
                    marginLeft: sideBarOpen ? "250px" : "0",
                    transition: "margin 0.3s",
                }}
            >
                {children}
            </main>
        </>
    );
}