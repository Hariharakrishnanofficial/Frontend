import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero">
                <h1>Smart Irrigation System for Precision Farming</h1>
                <p>
                    Water scarcity is a major challenge in agriculture, leading to inefficient water use and reduced crop yields. 
                    Our Smart Irrigation System leverages **IoT and sensor technology** to optimize irrigation, ensuring efficient water usage and enhanced crop yield.
                </p>
                <Link to="/dashboard" className="cta-button">View Live Data</Link>
            </header>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <h3>📡 Sensor Monitoring</h3>
                        <p>Soil moisture and weather conditions are monitored in real-time using IoT sensors.</p>
                    </div>

                    <div className="step">
                        <h3>📊 Data Analysis</h3>
                        <p>Collected data is analyzed to determine the optimal irrigation schedule.</p>
                    </div>

                    <div className="step">
                        <h3>🚀 Smart Control</h3>
                        <p>Farmers receive **real-time alerts** and can control the water pump via a mobile app.</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Key Features</h2>
                <div className="feature-grid">
                    <Link to="/dashboard" className="feature-card">
                        <h3>📊 Live Sensor Data</h3>
                        <p>Monitor real-time soil moisture and environmental conditions.</p>
                    </Link>

                    <Link to="/notification" className="feature-card">
                        <h3>📩 Irrigation Alerts</h3>
                        <p>Receive notifications on optimal irrigation times.</p>
                    </Link>

                    <Link to="/schedule" className="feature-card">
                        <h3>⏳ Automated Scheduling</h3>
                        <p>Schedule irrigation based on real-time sensor readings.</p>
                    </Link>

                    <Link to="/SensorDashboard" className="feature-card">
                        <h3>🚀 Smart Water Management</h3>
                        <p>Reduce water wastage and improve crop yield.</p>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 Smart Irrigation System | Built for Sustainable Farming</p>
            </footer>
        </div>
    );
};

export default Home;
