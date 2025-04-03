import React, { useState, useEffect } from "react";
import "./Control.css";
import CONFIG from "./url";
import { FaTemperatureHigh, FaTint, FaCloudRain, FaLightbulb, FaLeaf, FaPowerOff, FaBolt } from "react-icons/fa";


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
            <h1 className="dashboard-title">🌿 Real-Time Sensor Monitoring</h1>
            
            {/* Sensor Data */}
            <div className="sensor-container">
                <div className="sensor">
                    <FaTemperatureHigh className="icon temp" />
                    <h2>Temperature</h2>
                    <p>{sensorData.Temperature} °C</p>
                </div>
                <div className="sensor">
                    <FaTint className="icon humidity" />
                    <h2>Humidity</h2>
                    <p>{sensorData.Humidity} %</p>
                </div>
                <div className="sensor">
                    <FaCloudRain className="icon rain" />
                    <h2>Rain Sensor</h2>
                    <p>{sensorData.RainSensor}</p>
                </div>
                <div className="sensor">
                    <FaLeaf className="icon moisture" />
                    <h2>Moisture Sensor 1</h2>
                    <p>{sensorData.MoistureSensor1}</p>
                </div>
                <div className="sensor">
                    <FaLeaf className="icon moisture" />
                    <h2>Moisture Sensor 2</h2>
                    <p>{sensorData.MoistureSensor2}</p>
                </div>
                <div className="sensor">
                    <FaLightbulb className="icon light" />
                    <h2>Light Intensity</h2>
                    <p>{sensorData.LightIntensity}</p>
                </div>
            </div>

            {/* Water Pump Control */}
            <div className="control">
                <h2>Water Pump Control</h2>
                <p>Status: <strong className={`status ${pumpStatus.toLowerCase()}`}>{pumpStatus}</strong></p>
                
                {/* Toggle Button */}
                <button 
                    className={`toggle-button ${pumpStatus === "ON" ? "on" : "off"}`} 
                    onClick={togglePumpStatus}>
                    {pumpStatus === "ON" ? <FaPowerOff size={20} color="red" /> : <FaBolt size={20} color="green" />}
                    {pumpStatus === "ON" ? " Turn Off" : " Turn On"}
                </button>
            </div>
        </div>
    );
};

export default SensorDashboard;
