import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({ labels: [], datasets: [] });

  const url = "https://backend-software-6mz4.onrender.com/api/sensor-data";

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
              { label: "Temperature (°C)", data: data.map((entry) => entry.temperature), borderColor: "red" },
              { label: "Humidity (%)", data: data.map((entry) => entry.humidity), borderColor: "blue" },
              { label: "Moisture 1", data: data.map((entry) => entry.moisture_sensor1), borderColor: "green" },
              { label: "Moisture 2", data: data.map((entry) => entry.moisture_sensor2), borderColor: "purple" },
              { label: "Rain Sensor", data: data.map((entry) => (entry.RainSensor === "YES" ? 1 : 0)), borderColor: "orange" },
              { label: "Light Intensity", data: data.map((entry) => entry.LightIntensity), borderColor: "yellow" }, // Light Intensity Chart
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
      <h1 className="dashboard-title">Sensor Data Monitoring</h1>

      {/* Dashboard Grid */}
      <div className="chart-container">
        {sensorData.datasets.map((dataset, index) => (
          <div key={index} className="chart-box">
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
    </div>
  );
};

export default SensorDashboard;
