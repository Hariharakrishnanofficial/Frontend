import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import CONFIG from "./url";
const API_URL = CONFIG.API_URL;

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setMessage({ text: "", type: "" });
    };

    const sendRequest = async (endpoint, data) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            return { status: "fail", error: "Network error" };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignUp ? "signup" : "signin";
        const result = await sendRequest(endpoint, { username, password });

        if (result.status === "success") {
            setMessage({ text: isSignUp ? "Signup successful! Please sign in." : "Sign-in successful!", type: "success" });
            
            if (!isSignUp) {
                setTimeout(() => navigate("/dashboard"), 1000);
            } else {
                toggleForm();
            }
        } else {
            setMessage({ text: result.error, type: "error" });
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

            {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>

            <p className="toggle" onClick={toggleForm}>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
};

export default Auth;
