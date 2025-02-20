import React from "react";
import { Thermometer } from "lucide-react";

const TemperatureIndicator = ({ temperature }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <Thermometer size={50} className="text-red-400" />
      <h2 className="text-xl font-semibold mt-2">Temperature</h2>
      <p className="text-2xl font-bold">{temperature}°C</p>
    </div>
  );
};

export default TemperatureIndicator;
