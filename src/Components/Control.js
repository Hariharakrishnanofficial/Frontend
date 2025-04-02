import React, { useState, useEffect } from "react";
import "./Control.css";

const API_URL = "https://backend-software-6mz4.onrender.com";

const SensorDashboard = () => {
    const [sensorData, setSensorData] = useState({
        temperature: "--",
        humidity: "--",
        rain: "--",
        moistureSensor1: "--",
        moistureSensor2: "--",
        lightIntensity: "--",
    });

    const [pumpStatus, setPumpStatus] = useState("--");

    const fetchSensorData = async () => {
        try {
            const response = await fetch(`${API_URL}/get-data`);
            const data = await response.json();
            if (data.length > 0) {
                const latestData = data[0];
                setSensorData({
                    temperature: latestData.temperature || "--",
                    humidity: latestData.humidity || "--",
                    rain: latestData.RainSensor === "YES" ? "Yes" : "No",
                    moistureSensor1: latestData.moistureSensor1 || "--",
                    moistureSensor2: latestData.moistureSensor2 || "--",
                    lightIntensity: latestData.Light || "--",
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

    const setPumpStatusAPI = async (status) => {
        try {
            await fetch(`${API_URL}/set-pump`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pump: status }),
            });
            fetchPumpStatus();
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
                <p>{pumpStatus}</p>
                <button className="on" onClick={() => setPumpStatusAPI("ON")}>Turn On</button>
                <button className="off" onClick={() => setPumpStatusAPI("OFF")}>Turn Off</button>
            </div>
        </div>
    );
};

export default SensorDashboard;
