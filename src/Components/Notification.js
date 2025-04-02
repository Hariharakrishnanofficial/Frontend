import React, { useEffect, useState } from "react";
import "./Notification.css"

const EmailManagement = () => {
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });

  const url = "https://backend-software-6mz4.onrender.com";

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${url}/get-emails`);
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      showPopup("Error fetching emails", "error");
    }
  };

  const storeEmail = async () => {
    if (!email) {
      showPopup("Please enter an email.", "error");
      return;
    }

    try {
      const response = await fetch(`${url}/store-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (response.ok) {
        showPopup(result.message, "success");
        setEmail("");
        fetchEmails();
      } else {
        showPopup(result.error, "error");
      }
    } catch (error) {
      showPopup("Error storing email", "error");
    }
  };

  const deleteEmail = async (emailToDelete) => {
    if (!window.confirm(`Are you sure you want to delete ${emailToDelete}?`)) return;

    try {
      const response = await fetch(`${url}/delete-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToDelete })
      });

      const result = await response.json();
      if (response.ok) {
        showPopup(result.message, "success");
        fetchEmails();
      } else {
        showPopup(result.error, "error");
      }
    } catch (error) {
      showPopup("Error deleting email", "error");
    }
  };

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 2000);
  };

  return (
    <div className="container">
      <h2>Email Management</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={storeEmail}>Store Email</button>

      <h3>Stored Emails</h3>
      <ul id="emailList">
        {emails.length === 0 ? (
          <p>No emails stored.</p>
        ) : (
          emails.map((item, index) => (
            <li key={index}>
              <span>{item.email}</span>
              <button onClick={() => deleteEmail(item.email)}>Delete</button>
            </li>
          ))
        )}
      </ul>

      {/* Popup Notification */}
      {popup.message && <div className={`popup ${popup.type}`}>{popup.message}</div>}
    </div>
  );
};

export default EmailManagement;
