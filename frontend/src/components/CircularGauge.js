import React from 'react';

const CircularGauge = ({ value, max, label, color, icon, darkMode }) => {
  const percent = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percent / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke={darkMode ? "#2a3143" : "#e5e7eb"} strokeWidth="8" />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-2xl font-bold ${color}`}>{value.toFixed(0)}</div>
          <div className="flex items-center mt-1">
            {icon}
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-1`}>{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularGauge;
