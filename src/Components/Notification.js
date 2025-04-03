import React, { useEffect, useState } from "react";
import "./Notification.css";
import CONFIG from "./url";

const EmailManagement = () => {
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });

  const url = CONFIG.API_URL;

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${url}/get-emails`);
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      showPopup("⚠️ Error fetching emails", "error");
    }
  };

  const storeEmail = async () => {
    if (!email) {
      showPopup("❌ Please enter an email.", "error");
      return;
    }

    try {
      const response = await fetch(`${url}/store-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        showPopup("✅ Email stored successfully!", "success");
        setEmail("");
        fetchEmails();
      } else {
        showPopup(result.error, "error");
      }
    } catch (error) {
      showPopup("❌ Error storing email", "error");
    }
  };

  const deleteEmail = async (emailToDelete) => {
    if (!window.confirm(`Are you sure you want to delete ${emailToDelete}?`)) return;

    try {
      const response = await fetch(`${url}/delete-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToDelete }),
      });

      const result = await response.json();
      if (response.ok) {
        showPopup("✅ Email deleted successfully!", "success");
        fetchEmails();
      } else {
        showPopup(result.error, "error");
      }
    } catch (error) {
      showPopup("❌ Error deleting email", "error");
    }
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 2000);
  };

  return (
    <div className="email-container">
      {/* Header Section */}
      <header className="email-header">
        <h1>📧 Email Management</h1>
        <p>Store and manage email subscriptions with ease.</p>
      </header>

      {/* Email Input Form */}
      <div className="email-form">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={storeEmail} className="store-btn">Store Email</button>
      </div>

      {/* Stored Emails List */}
      <div className="email-list-container">
        <h3>📜 Stored Emails</h3>
        {emails.length === 0 ? (
          <p className="no-emails">No emails stored.</p>
        ) : (
          <ul className="email-list">
            {emails.map((item, index) => (
              <li key={index} className="email-item">
                <span>{item.email}</span>
                <button className="delete-btn" onClick={() => deleteEmail(item.email)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popup Notification */}
      {popup.message && <div className={`popup ${popup.type}`}>{popup.message}</div>}
      
      {/* Footer */}
      <footer className="email-footer">
        <p>© 2025 Email Manager | Secure & Efficient</p>
      </footer>
    </div>
  );
};

export default EmailManagement;
