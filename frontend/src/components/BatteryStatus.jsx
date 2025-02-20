import React from "react";
import { Battery } from "lucide-react";

const BatteryStatus = ({ battery }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <Battery size={50} className="text-green-400" />
      <h2 className="text-xl font-semibold mt-2">Battery</h2>
      <p className="text-2xl font-bold">{battery}%</p>
    </div>
  );
};

export default BatteryStatus;
import React from "react";
import { Battery } from "lucide-react";

const BatteryStatus = ({ battery }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <Battery size={50} className="text-green-400" />
      <h2 className="text-xl font-semibold mt-2">Battery</h2>
      <p className="text-2xl font-bold">{battery}%</p>
    </div>
  );
};

export default BatteryStatus;
tteryStatus;
