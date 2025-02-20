import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

const AlertNotifications = ({ alerts }) => {
  const [sending, setSending] = useState(null); // Track which alert is being sent

  const sendSMS = async (alertMessage, index) => {
    if (sending !== null) return; // Prevent multiple clicks
    setSending(index); // Disable button while sending

    console.log(`📨 Sending SMS: ${alertMessage}`);

    try {
      const response = await fetch("http://127.0.0.1:8000/send-sms/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "+918617888597",
          body: alertMessage,
        }),
      });

      console.log("📡 API Response:", response);
      const data = await response.json();

      if (response.ok) {
        alert(`✅ SMS Sent: ${data.sid}`);
      } else {
        alert(`❌ Error: ${data.detail}`);
      }
    } catch (error) {
      console.error("🚨 API Request Failed:", error);
      alert(`⚠️ Failed to send SMS: ${error.message}`);
    } finally {
      setSending(null); // Re-enable button
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <AlertTriangle className="text-yellow-400 mr-2" /> Alerts
      </h2>

      {alerts.length === 0 ? (
        <p className="text-gray-400">No alerts</p>
      ) : (
        <ul className="text-red-400">
          {alerts.map((alert, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              {alert}
              <button
  onClick={() => sendSMS(alert, index)}
  disabled={sending === index}
  className={`ml-4 px-3 py-1 rounded text-white ${
    sending === index ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
  style={{ pointerEvents: "auto", zIndex: 100 }}
>
  {sending === index ? "Sending..." : "Send SMS"}
</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertNotifications;
import React from "react";
import { AlertTriangle } from "lucide-react";

const AlertNotifications = ({ alerts }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <AlertTriangle className="text-yellow-400 mr-2" /> Alerts
      </h2>
      {alerts.length === 0 ? (
        <p className="text-gray-400">No alerts</p>
      ) : (
        <ul className="text-red-400">
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertNotifications;
