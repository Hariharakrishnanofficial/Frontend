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
              { label: "🌱 Moisture Sensor 1", data: data.map((entry) => entry.moistureSensor1), borderColor: "#2ecc71" },
              { label: "🌿 Moisture Sensor 2", data: data.map((entry) => entry.moistureSensor2), borderColor: "#9b59b6" },
              { label: "🌧 Rain Sensor", data: data.map((entry) => (entry.RainSensor === "YES" ? 1 : 0)), borderColor: "#f39c12" },
              { label: "☀️ Light Intensity", data: data.map((entry) => entry.Light), borderColor: "#f1c40f" },
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
                    y: { display: true, title: { display: true, text: dataset.label } },
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

// Export the component
export default SensorDashboard;
