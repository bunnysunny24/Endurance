import { useState, useEffect } from "react";

const useVehicleData = () => {
  const [data, setData] = useState({
    speed: 0,
    acceleration: 0,
    suspension: { frontLeft: 0, frontRight: 0, rearLeft: 0, rearRight: 0 },
    temperature: 20,
    battery: 100,
    alerts: [],
    history: [],
  });

  useEffect(() => {
    const fetchData = () => {
      // Simulated real-time data updates
      setData((prevData) => {
        const time = new Date().toLocaleTimeString();
        const newSpeed = Math.floor(Math.random() * 120);
        const newAcceleration = (Math.random() * 5).toFixed(2);
        const newTemperature = Math.floor(Math.random() * 40);
        const newBattery = Math.max(prevData.battery - Math.random() * 2, 10);
        const newSuspension = {
          frontLeft: Math.random() * 100,
          frontRight: Math.random() * 100,
          rearLeft: Math.random() * 100,
          rearRight: Math.random() * 100,
        };

        const newAlerts = [];
        if (newSpeed > 100) newAlerts.push("⚠ High Speed!");
        if (newBattery < 15) newAlerts.push("⚠ Low Battery!");
        if (newTemperature > 35) newAlerts.push("⚠ High Temperature!");

        return {
          speed: newSpeed,
          acceleration: parseFloat(newAcceleration),
          suspension: newSuspension,
          temperature: newTemperature,
          battery: parseFloat(newBattery.toFixed(1)),
          alerts: newAlerts,
          history: [...prevData.history.slice(-10), { time, acceleration: newAcceleration, speed: newSpeed }],
        };
      });
    };

    const interval = setInterval(fetchData, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return data;
};

export default useVehicleData;