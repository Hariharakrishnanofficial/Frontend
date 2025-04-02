import React, { useState, useEffect } from "react";
import "./Control.css";
import CONFIG from "./url";

const API_URL = CONFIG.API_URL;

const SensorDashboard = () => {
    const [sensorData, setSensorData] = useState({
        Temperature: "--",
        Humidity: "--",
        RainSensor: "--",
        MoistureSensor1: "--",
        MoistureSensor2: "--",
        LightIntensity: "--",
    });

    const [pumpStatus, setPumpStatus] = useState("--");

    const fetchSensorData = async () => {
        try {
            const response = await fetch(`${API_URL}/get-data`);
            const data = await response.json();
            if (data.length > 0) {
                const latestData = data[0];
                setSensorData({
                    Temperature: latestData.temperature || "--",
                    Humidity: latestData.humidity || "--",
                    RainSensor: latestData.RainSensor === "YES" ? "Yes" : "No",
                    MoistureSensor1: latestData.moistureSensor1 || "--",
                    MoistureSensor2: latestData.moistureSensor2 || "--",
                    LightIntensity: latestData.Light || "--",
                });
            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    };

    const fetchPumpStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/get-pump`);
            const data = await response.json();
            setPumpStatus(data.pump || "OFF");
        } catch (error) {
            console.error("Error fetching pump status:", error);
        }
    };

    const togglePumpStatus = async () => {
        const newStatus = pumpStatus === "ON" ? "OFF" : "ON";
        try {
            await fetch(`${API_URL}/set-pump`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pump: newStatus }),
            });
            setPumpStatus(newStatus);
        } catch (error) {
            console.error("Error setting pump status:", error);
        }
    };

    useEffect(() => {
        fetchSensorData();
        fetchPumpStatus();
        const interval = setInterval(fetchSensorData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <h1>Real-Time Sensor Dashboard</h1>
            
            {/* Sensor Data */}
            <div className="sensor-container">
                {Object.entries(sensorData).map(([key, value]) => (
                    <div className="sensor" key={key}>
                        <h2>{key.replace(/([A-Z])/g, " $1").trim()}</h2>
                        <p>{value}</p>
                    </div>
                ))}
            </div>

            {/* Water Pump Control */}
            <div className="control">
                <h2>Water Pump Control</h2>
                <p>Status: <strong>{pumpStatus}</strong></p>
                
                {/* Toggle Button */}
                <button 
                    className={`toggle-button ${pumpStatus === "ON" ? "on" : "off"}`} 
                    onClick={togglePumpStatus}
                >
                    {pumpStatus === "ON" ? "Turn Off" : "Turn On"}
                </button>
            </div>
        </div>
    );
};

export default SensorDashboard;
