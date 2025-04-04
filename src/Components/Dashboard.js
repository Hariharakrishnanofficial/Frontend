import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import CONFIG from "./url";
import "./Dashboard.css"; // Import CSS for styling
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({ labels: [], datasets: [] });

  const url = CONFIG.API_URL + "/api/sensor-data";

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
          const timestamps = data.map((entry) => new Date(entry.timestamp).toLocaleTimeString());

          setSensorData({
            labels: timestamps,
            datasets: [
              { label: "🌡 Temperature (°C)", data: data.map((entry) => entry.temperature), borderColor: "#ff5733" },
              { label: "💧 Humidity (%)", data: data.map((entry) => entry.humidity), borderColor: "#3498db" },
              { 
                label: "🌱 Moisture Sensor 1", 
                data: data.map((entry) => mapMoisture(entry.moistureSensor1)), 
                borderColor: "#2ecc71" 
              },
              { 
                label: "🌿 Moisture Sensor 2", 
                data: data.map((entry) => mapMoisture(entry.moistureSensor2)), 
                borderColor: "#9b59b6" 
              },
              { 
                label: "☀️ Light Intensity", 
                data: data.map((entry) => mapLightIntensity(entry.LightIntensity)), 
                borderColor: "#f1c40f" 
              },
              { label: "🌧 Rain Sensor", data: data.map((entry) => (entry.RainSensor === "YES" ? 1 : 0)), borderColor: "#f39c12" },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Convert Moisture Sensor values (0 - 4095) to readable words
  const mapMoisture = (value) => {
    if (value < 1000) return 0; // "Dry"
    if (value < 2500) return 1; // "Moist"
    return 2; // "Wet"
  };

  // Convert Light Intensity values (0 - 4095) to readable words
  const mapLightIntensity = (value) => {
    if (value < 1000) return 0; // "Dark"
    if (value < 2500) return 1; // "Dim"
    return 2; // "Bright"
  };

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <header className="dashboard-hero">
        <h1>📊 Smart Agriculture Dashboard</h1>
        <p>Monitor real-time environmental conditions and optimize irrigation efficiency.</p>
      </header>

      {/* Sensor Data Charts */}
      <div className="chart-grid">
        {sensorData.datasets.map((dataset, index) => (
          <div key={index} className="chart-card">
            <h2 className="chart-title">{dataset.label}</h2>
            <div className="chart-wrapper">
              <Line
                data={{ labels: sensorData.labels, datasets: [dataset] }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  elements: { point: { radius: 2 } },
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: true, title: { display: true, text: "Time" } },
                    y: { 
                      display: true, 
                      title: { display: true, text: dataset.label },
                      ticks: dataset.label.includes("Moisture") || dataset.label.includes("Light")
                        ? { stepSize: 1, callback: (value) => (value === 0 ? "Low" : value === 1 ? "Medium" : "High") }
                        : {},
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2025 Smart Agriculture System | Precision Farming with IoT</p>
      </footer>
    </div>
  );
};

export default SensorDashboard;
