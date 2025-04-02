import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import CONFIG from "./url";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">My App</div>
            
            {/* Hamburger Icon */}
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Navigation Links */}
            <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/notification" onClick={() => setMenuOpen(false)}>Notification</Link></li>
                <li><Link to="/schedule" onClick={() => setMenuOpen(false)}>Schedule</Link></li>
                <li><Link to="/SensorDashboard" onClick={() => setMenuOpen(false)}>Sensor Dashboard</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
