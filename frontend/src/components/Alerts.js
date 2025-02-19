import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Alerts = ({ alerts, darkMode }) => {
  return (
    <div className={`rounded-lg ${darkMode ? 'bg-slate-700/30' : 'bg-gray-50'} overflow-auto max-h-96`}>
      {alerts.length === 0 ? (
        <div className={`p-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No active alerts
        </div>
      ) : (
        <ul className="divide-y divide-gray-700">
          {alerts.map(alert => (
            <li key={alert.id} className={`p-4 ${alert.severity === 'high' ? (darkMode ? 'bg-red-900/20' : 'bg-red-50') : ''}`}>
              <div className="flex items-start">
                <div className={`p-1.5 rounded-full ${alert.severity === 'high' ? 'bg-red-500/20' : (darkMode ? 'bg-amber-500/20' : 'bg-amber-100')}`}>
                  <AlertTriangle className={`h-4 w-4 ${alert.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${alert.severity === 'high' ? 'text-red-500' : (darkMode ? 'text-amber-300' : 'text-amber-600')}`}>
                    {alert.message}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
