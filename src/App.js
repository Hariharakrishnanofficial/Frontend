import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import SensorDataMonitoring from "./Components/Dashboard";
import EmailManagement from "./Components/Notification";
import TaskScheduler from "./Components/Schedule";
import SensorDashboard from "./Components/Control"
import Navbar from "./Components/Navbar";

function App() {
    return (
        <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<SensorDataMonitoring />} />
            <Route path="/notification" element={<EmailManagement />} />
            <Route path="/schedule" element={<TaskScheduler />} />
            <Route path="/SensorDashboard" element={<SensorDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
    );
}

export default App;
