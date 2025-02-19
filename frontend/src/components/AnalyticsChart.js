import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsChart = ({ data, selectedChart, darkMode }) => {
  const colors = {
    speed: '#6366f1',
    acceleration: '#34d399',
    temperature: '#f97316',
  };

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data.history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`${selectedChart}Gradient`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[selectedChart]} stopOpacity={0.4} />
              <stop offset="95%" stopColor={colors[selectedChart]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#2a3143" : "#e5e7eb"} />
          <XAxis dataKey="time" tickFormatter={() => ''} stroke={darkMode ? "#94a3b8" : "#6b7280"} />
          <YAxis domain={['auto', 'auto']} stroke={darkMode ? "#94a3b8" : "#6b7280"} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1e293b" : "#ffffff",
              borderColor: darkMode ? "#334155" : "#e5e7eb",
              color: darkMode ? "#f1f5f9" : "#1f2937",
            }}
          />
          <Area
            type="monotone"
            dataKey={selectedChart}
            stroke={colors[selectedChart]}
            strokeWidth={2}
            fill={`url(#${selectedChart}Gradient)`}
            activeDot={{ r: 6, fill: colors[selectedChart], strokeWidth: 2, stroke: darkMode ? "#1e293b" : "#ffffff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
