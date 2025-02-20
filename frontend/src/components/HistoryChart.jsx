import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HistoryChart = ({ history }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">History</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={history}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Area type="monotone" dataKey="speed" stroke="#4f46e5" fill="#4f46e5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HistoryChart = ({ history }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">History</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={history}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Area type="monotone" dataKey="speed" stroke="#4f46e5" fill="#4f46e5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;