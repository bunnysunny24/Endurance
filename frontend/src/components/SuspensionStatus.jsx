import React from "react";

const SuspensionStatus = ({ suspension }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Suspension</h2>
      <ul className="text-gray-400">
        <li>Front Left: {suspension.frontLeft}</li>
        <li>Front Right: {suspension.frontRight}</li>
        <li>Rear Left: {suspension.rearLeft}</li>
        <li>Rear Right: {suspension.rearRight}</li>
      </ul>
    </div>
  );
};

export default SuspensionStatus;
