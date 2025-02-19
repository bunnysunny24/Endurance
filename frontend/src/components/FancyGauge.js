import React from 'react';

const FancyGauge = ({ value, max, label, color, unit = "", darkMode }) => {
  const percent = (value / max) * 100;
  
  return (
    <div className="relative pt-1 mb-4">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${color} ${darkMode ? 'bg-opacity-20' : 'bg-opacity-10'} text-opacity-80`}>
            {label}
          </span>
        </div>
        <div className="text-right">
          <span className={`text-sm font-medium ${color}`}>
            {value.toFixed(1)}{unit}
          </span>
        </div>
      </div>
      
      <div className="relative h-4">
        <div className={`absolute inset-0 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} style={{ height: '0.5rem' }}>
          <div 
            style={{ width: `${percent}%` }}
            className={`h-full transition-all duration-500 ease-out ${color.replace('text-', 'bg-')}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FancyGauge;
