import React, { useEffect, useState } from "react";

const AccelerationGraph = () => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/plot-acceleration/");
        const data = await response.json();
        console.log("API Response:", data);  // ✅ Debugging step
        setImageSrc(data.graph);  // ✅ Update state with image data
      } catch (error) {
        console.error("Error fetching the plot:", error);
      }
    };

    fetchPlot();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Acceleration</h2>
      <div className="mt-4">
        <h3 className="text-lg text-white">IMU Resultant Acceleration</h3>
        {imageSrc ? (
          <img src={imageSrc} alt="IMU Acceleration" className="w-full rounded-lg" />
        ) : (
          <p className="text-white">Loading plot...</p>
        )}
      </div>
    </div>
  );
};

export default AccelerationGraph;
