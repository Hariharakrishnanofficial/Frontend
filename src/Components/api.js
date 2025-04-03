import React, { useState, useEffect } from "react";
import "./api.css";
import CONFIG from "./url";
const API_URL = CONFIG.API_URL;  



const ApiManager = () => {
    const [apiKey, setApiKey] = useState("");  // Input field value
    const [apiList, setApiList] = useState([]); // List of APIs
    const [storedApi, setStoredApi] = useState(""); // Variable to store API from DB
    const [message, setMessage] = useState("");

    // ✅ Function to fetch stored APIs from the database
    const fetchApiList = async () => {
        try {
            const response = await fetch(`${API_URL}/get-api`);
            const data = await response.json();
            setApiList(data);

            // ✅ Assign first API from DB to storedApi variable (if available)
            if (data.length > 0) 
            {
                CONFIG.localHost=data[0].api;
                console.log("API Code From database:",CONFIG.localHost );    
                setStoredApi(data[0].api);
            }
        } catch (error) {
            console.error("Error fetching API list:", error);
        }
    };

    // ✅ Function to store a new API
    const handleStoreApi = async () => {
        if (!apiKey.trim()) {
            setMessage("API key is required!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/store-api`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ api: apiKey }),
            });
            const result = await response.json();
            setMessage(result.message || result.error);
            if (response.ok) {
                setApiKey("");
                fetchApiList(); // Refresh API list
            }
        } catch (error) {
            setMessage("Error storing API.");
        }
    };

    // ✅ Function to delete an API
    const handleDeleteApi = async (api) => {
        try {
            const response = await fetch(`${API_URL}/delete-api`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ api }),
            });
            const result = await response.json();
            setMessage(result.message || result.error);
            if (response.ok) {
                fetchApiList(); // Refresh API list
            }
        } catch (error) {
            setMessage("Error deleting API.");
        }
    };

    // ✅ Fetch API when the component first loads
    useEffect(() => {
        fetchApiList();
    }, []);

    return (
        <div className="api-manager">
            <h1>API Manager</h1>

            {/* Display assigned API */}
            <p><strong>Stored API:</strong> {storedApi || "No API available"}</p>

            {/* Message */}
            {message && <p className="message">{message}</p>}

            {/* Add API Section */}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button onClick={handleStoreApi}>Store API</button>
            </div>

            {/* API List */}
            <div className="api-list">
                <h2>Stored APIs</h2>
                {apiList.length === 0 ? (
                    <p>No APIs stored.</p>
                ) : (
                    <ul>
                        {apiList.map((item, index) => (
                            <li key={index}>
                                {item.api}
                                <button className="delete-btn" onClick={() => handleDeleteApi(item.api)}>
                                    ❌ Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ApiManager;
