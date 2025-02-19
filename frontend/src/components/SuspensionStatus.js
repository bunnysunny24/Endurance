import React from 'react';

const SuspensionStatus = ({ suspension, darkMode }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {Object.entries(suspension).map(([position, value]) => (
        <div key={position} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/40' : 'bg-gray-100'}`}>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{position.replace(/([A-Z])/g, ' $1').trim()}</p>
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100'}`}>
              <span className={`text-lg font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>{value.toFixed(0)}</span>
            </div>
            <div className="ml-3 flex-1">
              <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} overflow-hidden`}>
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuspensionStatus;
