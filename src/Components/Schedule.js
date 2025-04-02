import React, { useState } from "react";
import "./Schedule.css"; // Import CSS for styling

const TaskScheduler = () => {
  const [scheduleType, setScheduleType] = useState("");
  const [formData, setFormData] = useState({
    schedule_type: "",
    time: "",
    datetime: "",
    interval: "",
    delay: "0",
    revert_delay: "5",
    action: "on",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const url = "https://backend-software-6mz4.onrender.com";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (payload.delay) payload.delay = parseInt(payload.delay, 10);
    if (payload.interval) payload.interval = parseInt(payload.interval, 10);
    if (payload.revert_delay) payload.revert_delay = parseInt(payload.revert_delay, 10);

    try {
      const response = await fetch(url + "/schedule-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setResponseMessage(result.message || result.error);
    } catch (error) {
      setResponseMessage("An error occurred while scheduling the task.");
    }
  };

  return (
    <div className="scheduler-wrapper">
    <div className="scheduler-container">
      <h2>Schedule a Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="schedule-type">Schedule Type:</label>
        <select
          id="schedule-type"
          name="schedule_type"
          value={formData.schedule_type}
          onChange={(e) => {
            setScheduleType(e.target.value);
            handleInputChange(e);
          }}
          required
        >
          <option value="">Select...</option>
          <option value="daily">Daily</option>
          <option value="hourly">Hourly</option>
          <option value="specific">Specific Date & Time</option>
          <option value="minute">Every N Minutes</option>
        </select>

        {/* Daily Time Input */}
        {scheduleType === "daily" && (
          <div>
            <label htmlFor="daily-time-input">Time (HH:MM):</label>
            <input type="time" id="daily-time-input" name="time" value={formData.time} onChange={handleInputChange} />
          </div>
        )}

        {/* Specific Date & Time Input */}
        {scheduleType === "specific" && (
          <div>
            <label htmlFor="specific-datetime-input">Date & Time:</label>
            <input
              type="datetime-local"
              id="specific-datetime-input"
              name="datetime"
              value={formData.datetime}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Minute Interval Input */}
        {scheduleType === "minute" && (
          <div>
            <label htmlFor="minute-interval-input">Interval (minutes):</label>
            <input
              type="number"
              id="minute-interval-input"
              name="interval"
              min="1"
              value={formData.interval}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Delay Before Execution */}
        <label htmlFor="delay-input">Delay before execution (minutes):</label>
        <input type="number" id="delay-input" name="delay" min="0" value={formData.delay} onChange={handleInputChange} />

        {/* Delay Before Reverting to 'Off' */}
        <label htmlFor="revert-delay-input">Delay before reverting to 'OFF' (minutes):</label>
        <input
          type="number"
          id="revert-delay-input"
          name="revert_delay"
          min="1"
          value={formData.revert_delay}
          onChange={handleInputChange}
        />

        {/* Action Input */}
        <label htmlFor="action">Action:</label>
        <select id="action" name="action" value={formData.action} onChange={handleInputChange} required>
          <option value="on">ON</option>
          <option value="off">OFF</option>
        </select>

        <button type="submit">Schedule Task</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
    </div>
  );
};

export default TaskScheduler;
