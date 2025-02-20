import React from "react";
import { Gauge } from "lucide-react";

const Speedometer = ({ speed }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <Gauge size={50} className="text-blue-400" />
      <h2 className="text-xl font-semibold mt-2">Speed</h2>
      <p className="text-2xl font-bold">{speed} km/h</p>
    </div>
  );
};

import React from "react";
import { Gauge } from "lucide-react";

const Speedometer = ({ speed }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <Gauge size={50} className="text-blue-400" />
      <h2 className="text-xl font-semibold mt-2">Speed</h2>
      <p className="text-2xl font-bold">{speed} km/h</p>
    </div>
  );
};

export default Speedometer;