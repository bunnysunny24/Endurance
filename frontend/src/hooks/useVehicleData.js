import { useState, useEffect } from 'react';

const useVehicleData = () => {
  const [data, setData] = useState({
    acceleration: 0,
    speed: 0,
    suspension: { frontLeft: 0, frontRight: 0, rearLeft: 0, rearRight: 0 },
    temperature: 0,
    battery: 0,
    alerts: [],
    history: []
  });

  useEffect(() => {
    const fetchData = () => {
      const t = Date.now() / 1000;
      const newAcceleration = 2 + Math.sin(t / 2) * 1.5;
      const newSpeed = 50 + Math.sin(t / 5) * 20;
      const newSuspension = {
        frontLeft: Math.sin(t / 3) * 10 + 50,
        frontRight: Math.sin(t / 3 + 0.5) * 10 + 50,
        rearLeft: Math.sin(t / 3 + 1) * 10 + 50,
        rearRight: Math.sin(t / 3 + 1.5) * 10 + 50,
      };
      const newTemperature = 65 + Math.sin(t / 10) * 5;
      const newBattery = 75 + Math.sin(t / 15) * 5;
      const alertTypes = ['Low tire pressure', 'Engine check', 'Low fuel', 'Brake pad wear'];
      const newAlerts = data.alerts.filter(a => Math.random() > 0.05);
      if (Math.random() < 0.02) {
        newAlerts.push({
          id: Date.now(),
          message: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          severity: Math.random() < 0.3 ? 'high' : 'medium',
          timestamp: new Date().toISOString()
        });
      }
      const newHistory = [...data.history.slice(-49), { time: new Date().toISOString(), acceleration: newAcceleration, speed: newSpeed, temperature: newTemperature }];
      setData({ acceleration: newAcceleration, speed: newSpeed, suspension: newSuspension, temperature: newTemperature, battery: newBattery, alerts: newAlerts, history: newHistory });
    };

    fetchData();
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);
  
  return data;
};

export default useVehicleData;
